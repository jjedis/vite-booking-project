import express from "express";
import { pool } from "../db.js";


const router = express.Router();

router.get("/", async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "start and end required" });
  }

  try {
    const result = await pool.query(
      `
            SELECT id, start_time, end_time
            FROM bookings
            WHERE status = 'confirmed'
                AND start_time >= $1
                AND start_time <= $2
            `,
      [start, end],
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    console.error("Bookings query failed:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router; 