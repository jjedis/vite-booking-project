import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.put("/", authenticateToken, async (req, res) => {
    const {
        currentPassword,
        newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
        return res
            .status(400)
            .json({ error: "All fields must be filled" });
    }

    try {
        const pwdResult = await pool.query(
            `
                SELECT password_hash FROM auth_users
                WHERE id = $1
            `, [req.user.userId]
        );

        if (pwdResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const hash = pwdResult.rows[0].password_hash;

        const matches = await bcrypt.compare(currentPassword, hash);

        if (!matches) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        const new_hash = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `
                UPDATE auth_users
                SET password_hash = $1
                WHERE id = $2
            `, [new_hash, req.user.userId]
        );

        res.json({ message: "Password updated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update password" });
    }
});

export default router;
