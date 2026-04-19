import express from "express";
import {pool} from "../db.js";
import {authenticateToken} from "..middleware/authenticateToken.js";


const router = express.Router()

router.post("/", authenticateToken, async (req, res) => {

    try{
        const updateBooking = await pool.query(
            `
            UPDATE bookings
            SET status = cancelled
            WHERE id = $1
            
            `,[bookingId]
        );
        res.json(updateBooking.rows);
    }catch(err) {
        console.error(err)
        res.status(500).json({error: "Failed to update booking"})
    }
})

export default router;