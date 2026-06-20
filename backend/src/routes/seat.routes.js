import express from "express";
import { getSeatsByEventId } from "../controllers/seat.controller.js";

const router = express.Router();

router.get("/:eventId", getSeatsByEventId);

export default router;