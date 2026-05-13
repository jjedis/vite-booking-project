import express from "express";
import { pool } from "../db.js"
import { details } from "framer-motion/client";

const router = express.Router();

router.post("/", async (req, res) => {
    const {start_time, end_time, customer_id, notes} = req.body;

    try{
        const result = await pool.query(
          `
            INSERT INTO bookings (customer_id, service_id, start_time, end_time,  status, notes, tos_accepted)
            VALUES ($1, '7f9680bf-440d-4823-860d-49f67bf1a4bf',$2, $3, 'blocked', $4, 'false')
            RETURNING *;
            `,
          [customer_id, start_time, end_time, notes],
        );
        res.json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to block time",
            details: err.message,
        });
    }
})

export default router;