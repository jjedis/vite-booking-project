import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRoutes from "./routes/bookings.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingsRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
