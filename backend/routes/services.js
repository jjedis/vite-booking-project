import {pool} from "../db.js";
import express, { Router } from "express";

const router = express.Router();

router.get("/", async (req, res) => {

    try{
        const result = await pool.query(
            `SELECT id, name, duration_minutes, price_cents, description 
            FROM services 
            WHERE name != 'Blocked Time' AND is_active = 'true' 
            ORDER BY
                CASE name
                WHEN 'Hieronta 45min' THEN 1
                WHEN 'Hieronta 60min' THEN 2
                WHEN 'Hieronta 90min' THEN 3
                ELSE 4
                END,
                duration_minutes ASC`
        );
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch services"})
    }

});

export default router;
