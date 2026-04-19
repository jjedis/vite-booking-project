import express from "express";
import {pool} from "../db.js";
import jwt from "jsonwebtoken";
import {authenticateToken} from "../middleware/authenticateToken.js";

const router = express.Router();

router.put("/", authenticateToken, async (req, res) => {
    const {
        customerId,
        firstName,
        lastName,
        email,
        phone,
        address,
        postalCode,
        city,
    } = req.body;

    try{
        const result = await pool.query(
            `
            UPDATE customers
            SET
                first_name = $1,
                last_name = $2,
                email = $3,
                phone = $4,
                street_address = $5,
                postal_code = $6,
                city = $7
            WHERE id = $8
            RETURNING *
            `,
            [
                firstName,
                lastName,
                email,
                phone,
                address,
                postalCode,
                city,
                customerId,
            ]
        );
        const updatedUser = result.rows[0];

        const token = jwt.sign(
            {
                userId: req.user?.userId,
                customerId: updatedUser.id,
                firstName: updatedUser.first_name,
                lastName: updatedUser.last_name,
                address: updatedUser.street_address,
                postalCode: updatedUser.postal_code,
                city: updatedUser.city,
                role: updatedUser.role,
                email: updatedUser.email,
                phone: updatedUser.phone,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );
        res.json({
            message:"Profile updated",
            token,
        });

    }catch(err) {
        console.error(err);
        res.status(500).json({error:"Update failed"});
    }
});

export default router;