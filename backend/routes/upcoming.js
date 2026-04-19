import { pool } from "../db.js";
import express, {Router} from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router()

router.get("/:customerId", authenticateToken, async (req, res) => {
    const {customerId} = req.params;
    

    try{
        const bookings = await pool.query(
            `
            SELECT
                b.start_time,
                b.id,
                s.name AS service
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            WHERE b.customer_id = $1
            AND b.start_time >= NOW()
            ORDER BY b.start_time ASC
            `,[customerId]
        );
        res.json(bookings.rows);
    }catch (err){
        console.error(err);
        res.status(500).json({error: "Failed to fetch bookings"})
    }
});

export default router;


