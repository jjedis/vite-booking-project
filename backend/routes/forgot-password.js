import express from "express";
import crypto from "crypto";
import { pool } from "../db.js";
import { sendPasswordReset } from "../utils/mailer.js";

const router = express.Router();

const RESET_TOKEN_TTL_MINUTES = 30;
const FRONTEND_URL = "http://localhost:5173";

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Always send the same response, whether or not the email exists,
  // so this endpoint can't be used to check which emails are registered.
  const genericResponse = {
    message: "If that email exists, a reset link has been sent",
  };

  try {
    const result = await pool.query(
      `
        SELECT auth_users.id, customers.first_name
        FROM auth_users
        JOIN customers ON customers.id = auth_users.customer_id
        WHERE auth_users.email = $1
      `,
      [email],
    );

    if (result.rows.length === 0) {
      return res.json(genericResponse);
    }

    const user = result.rows[0];

    // The raw token goes in the email link. Only its hash is stored,
    // so a leaked database alone can't be used to reset anyone's password.
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expires = new Date(
      Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000,
    );

    await pool.query(
      `
        UPDATE auth_users
        SET reset_token_hash = $1, reset_token_expires = $2
        WHERE id = $3
      `,
      [tokenHash, expires, user.id],
    );

    const resetUrl = `${FRONTEND_URL}/reset-password?token=${rawToken}`;

    await sendPasswordReset({
      to: email,
      firstName: user.first_name,
      resetUrl,
    });

    res.json(genericResponse);
  } catch (err) {
    console.error("Forgot password failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
