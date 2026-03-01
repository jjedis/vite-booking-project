import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    const {
        etunimi,
        sukunimi,
        puh,
        sahkoposti,
        osoite,
        postinumero,
        postitoimipaikka,
        pwd,
        pwd_confirm,
        
    } = req.body

    if (
        !etunimi ||
        !sukunimi ||
        !puh ||
        !sahkoposti ||
        !osoite ||
        !postinumero ||
        !postitoimipaikka ||
        !pwd ||
        !pwd_confirm
        
    ) return res.status(400).json({ error: "All fields need to be filled" });

    const client = await pool.connect();

    try {
        await client.query("BEGIN")
        const existing = await client.query(
            "SELECT id FROM auth_users WHERE email = $1",
            [sahkoposti]
        );

        if (existing.rows.length > 0) {
            await client.query("ROLLBACK");
            return res.status(400).json({ error: "Email allready in use" })
        }

        const hashedPassword = await bcrypt.hash(pwd, 10);

        const customerResult = await client.query(
            `
            INSERT INTO customers (first_name, last_name, phone, street_address, postal_code, city, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
            `,
            [etunimi, sukunimi, puh, osoite, postinumero, postitoimipaikka, sahkoposti]
        );

        const customerId = customerResult.rows[0].id;

        await client.query(
            `
            INSERT INTO auth_users (customer_id, email, password_hash)
            VALUES ($1, $2, $3)
            `,
            [customerId, sahkoposti, hashedPassword]
        );

        await client.query("COMMIT");

        res.status(201).json({message: "User created successfully"});
    } catch (err){
        await client.query("ROLLBACK");
        console.error("Registration failed", err);
        res.status(500).json({error: "Registration failed"});
    } finally {
        client.release();
    }
});

export default router;