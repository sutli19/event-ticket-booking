import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import Seat from "../models/Seat.js";

export const confirmBooking = async (reservationId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const reservation = await Reservation.findById(reservationId).session(session);

    if (!reservation) {
      const error = new Error("Reservation not found");
      error.statusCode = 404;
      throw error;
    }

    if (reservation.status !== "active") {
      if (reservation.expiresAt <= new Date()) {
  reservation.status = "expired";
  await reservation.save({ session });

  await Seat.updateMany(
    {
      eventId: reservation.eventId,
      seatNumber: { $in: reservation.seatNumbers },
      reservationId: reservation._id,
    },
    {
      $set: {
        status: "available",
        reservationId: null,
      },
    },
    { session }
  );

  const error = new Error("Reservation has expired");
  error.statusCode = 410;
  throw error;
}}

if (reservation.status !== "active") {
  const error = new Error(
    `Reservation is not active (current status: ${reservation.status})`
  );
  error.statusCode = 409;
  throw error;
}

    if (reservation.expiresAt <= new Date()) {
      const error = new Error("Reservation has expired");
      error.statusCode = 410;
      throw error;
    }

    const validSeatsCount = await Seat.countDocuments({
      eventId: reservation.eventId,
      seatNumber: { $in: reservation.seatNumbers },
      status: "reserved",
      reservationId: reservation._id,
    }).session(session);

    if (validSeatsCount !== reservation.seatNumbers.length) {
      const error = new Error(
        "Some seats are no longer reserved for this booking"
      );
      error.statusCode = 409;
      throw error;
    }

    reservation.status = "confirmed";
    await reservation.save({ session });

    await Seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: { $in: reservation.seatNumbers },
        reservationId: reservation._id,
      },
      { $set: { status: "booked" } },
      { session }
    );

    await session.commitTransaction();

    return reservation;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};