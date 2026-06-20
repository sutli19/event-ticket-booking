import express from "express";
import {
  reserveSeatsController,
  getActiveReservationController,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", reserveSeatsController);
router.get("/user/:userId", getActiveReservationController);

export default router;