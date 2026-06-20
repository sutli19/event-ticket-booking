import express from "express";
import { confirmBookingController } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", confirmBookingController);

export default router;