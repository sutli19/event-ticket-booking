import { confirmBooking } from "../services/booking.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const confirmBookingController = async (req, res, next) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return errorResponse(res, "reservationId is required", [], 400);
    }

    const reservation = await confirmBooking(reservationId);

    return successResponse(res, "Booking confirmed successfully", { reservation }, 200);
  } catch (error) {
    return next(error);
  }
};