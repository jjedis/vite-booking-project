import {pool} from "../db.js";
import express, { Router } from "express";

const router = express.Router();

router.get("/", async (req, res) => {

    try{
        const result = await pool.query(
            "SELECT id, name, duration_minutes FROM services"
        );
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch services"})
    }

});

export default router;
