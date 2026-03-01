import express from "express";
import { pool } from "../db.js";
import { error } from "console";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    etunimi,
    sukunimi,
    puh,
    sahkoposti,
    osoite,
    postinumero,
    toimipaikka,
    service_id,
    start_time,
    end_time,
    lisatietoja,
    tos,
    marketing,
  } = req.body;

  if (
    !etunimi ||
    !sukunimi ||
    !puh ||
    !sahkoposti ||
    !osoite ||
    !postinumero ||
    !toimipaikka ||
    !service_id ||
    !start_time ||
    !end_time ||
    !tos 
    
  ) {
    return res
      .status(400)
      .json({ error: "All required fields are not filled." });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const customerResult = await client.query(
      `
        INSERT INTO customers(first_name, last_name, phone, email, street_address, postal_code, city)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (email)
        DO UPDATE SET
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          phone = EXCLUDED.phone,
          street_address = EXCLUDED.street_address,
          postal_code = EXCLUDED.postal_code,
          city = EXCLUDED.city
        RETURNING id
      `,
      [etunimi, sukunimi, puh, sahkoposti, osoite, postinumero, toimipaikka],
    );

    const customerId = customerResult.rows[0].id;

    const bookingResult = await client.query(
      `
      INSERT INTO bookings (customer_id, service_id, start_time, end_time, notes, tos_accepted, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'confirmed')
      RETURNING id
      `,
      [customerId, service_id, start_time, end_time, lisatietoja, tos],
    );

    if (marketing === true) {
      await client.query(
        `
        UPDATE customers
        SET
          marketing_consent = true,
          marketing_consent_given_at = COALESCE(marketing_consent_given_at, NOW())
          WHERE id = $1   
        `,
        [customerId],
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Booking created",
      bookingId: bookingResult.rows[0].id,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Transaction failed:", err);

    res.status(500).json({
      error: "Booking creation failed",
    });
  } finally {
    client.release();
  }
});

export default router;
