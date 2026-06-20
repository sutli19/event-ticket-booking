import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import eventRoutes from "./routes/event.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import seatRoutes from "./routes/seat.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use("/api/events", eventRoutes);
app.use("/api/reserve", reservationRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/seats", seatRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    errors: [],
  });
});

app.use(errorHandler);

export default app;