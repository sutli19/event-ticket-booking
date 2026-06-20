import { reserveSeats } from "../services/reservation.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const reserveSeatsController = async (req, res, next) => {
  try {
    const { userId, eventId, seatNumbers } = req.body;

    if (!userId || !eventId || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      return errorResponse(
        res,
        "userId, eventId and a non-empty seatNumbers array are required",
        [],
        400
      );
    }

    const reservation = await reserveSeats({ userId, eventId, seatNumbers });

    return successResponse(res, "Seats reserved successfully", { reservation }, 201);
  } catch (error) {
    return next(error);
  }
};