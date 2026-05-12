import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRoutes from "./routes/bookings.js";
import appointmentRoutes from "./routes/makeBooking.js";
import serviceRoutes from "./routes/services.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/authentication.js";
import upcomingBookings from "./routes/upcoming.js";
import updateProfileRoute from "./routes/updateProfile.js";
import adminBookingsRoute from "./routes/adminBookings.js";
import cancelBookingRoute from "./routes/cancel-booking.js";
import blockTimeRoute from "./routes/block-time.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingsRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/upcoming", upcomingBookings);
app.use("/api/updateProfile", updateProfileRoute);
app.use("/api/adminBookings", adminBookingsRoute);
app.use("/api/cancel-booking", cancelBookingRoute);
app.use("/api/block-time", blockTimeRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
