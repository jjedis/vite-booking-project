import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const result = await pool.query(
      `
        SELECT id FROM auth_users
        WHERE reset_token_hash = $1
        AND reset_token_expires > NOW()
      `,
      [tokenHash],
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Reset link is invalid or has expired" });
    }

    const userId = result.rows[0].id;
    const newHash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
        UPDATE auth_users
        SET password_hash = $1, reset_token_hash = NULL, reset_token_expires = NULL
        WHERE id = $2
      `,
      [newHash, userId],
    );

    res.json({ message: "Password reset" });
  } catch (err) {
    console.error("Reset password failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
