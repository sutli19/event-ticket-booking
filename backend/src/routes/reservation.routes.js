import express from "express";
import { reserveSeatsController } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", reserveSeatsController);

export default router;