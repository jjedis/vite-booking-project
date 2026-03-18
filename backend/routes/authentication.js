import express from "express";
import { pool } from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/", async (req, res) => {

    const {
        sahkoposti,
        salasana,
    } = req.body;

    if (
        !sahkoposti ||
        !salasana
    ){
        return res
        .status(400)
        .json({error: "All fields must be filled"})
    }


    try{
        const result = await pool.query(
          `
            SELECT 
              auth_users.id,
              auth_users.password_hash,
              auth_users.customer_id,
              auth_users.role,
              customers.first_name,
              customers.last_name
            FROM auth_users
            JOIN customers
            ON customers.id = auth_users.customer_id
            WHERE auth_users.email = $1
            `,
          [sahkoposti],
        );

        if (result.rows.length === 0){
            return res.status(401).json({error: "Invalid email or password"});
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            salasana,
            user.password_hash
        );

        if (!passwordMatch){
            return res.status(401).json({error: "Invalid email or password"});
        }

        const token = jwt.sign(
            {
                userId: user.id,
                customerId: user.customer_id,
                name: user.first_name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        res.json({
            message: "Login succesful",
            token
        });

    } catch (err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }

});
export default router;