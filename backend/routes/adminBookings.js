import express from "express";
import { pool } from "../db.js";
import {authenticateAdmin} from "../middleware/authenticateAdmin.js"


const router = express.Router();

router.get("/", authenticateAdmin, async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "start and end required" });
  }

  try {
    const result = await pool.query(
      `
            SELECT 
            b.id,
            b.start_time,
            b.end_time,
            b.notes,
            b.status,

            json_build_object(
              'name', s.name,
              'duration', s.duration_minutes
            ) AS service,
            
            json_build_object(
              'id', c.id,
              'first_name', c.first_name,
              'last_name', c.last_name,
              'email', c.email,
              'phone', c.phone,
              'address', c.street_address
            ) AS customer
          
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            JOIN customers c ON b.customer_id = c.id
            WHERE b.status = 'confirmed' OR b.status = 'blocked'
                AND b.start_time BETWEEN $1 AND $2
            ORDER BY b.start_time ASC;
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