import Seat from "../models/Seat.js";
import { successResponse } from "../utils/apiResponse.js";

export const getSeatsByEventId = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const seats = await Seat.find({ eventId }).sort({ seatNumber: 1 });

    return successResponse(res, "Seats fetched successfully", { seats });
  } catch (error) {
    return next(error);
  }
};