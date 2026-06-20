import mongoose from "mongoose";
import Event from "../models/Event.js";
import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";

const RESERVATION_DURATION_MS = 10 * 60 * 1000;

export const reserveSeats = async ({ userId, eventId, seatNumbers }) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const event = await Event.findById(eventId).session(session);

    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    const updateResult = await Seat.updateMany(
      {
        eventId,
        seatNumber: { $in: seatNumbers },
        status: "available",
      },
      { $set: { status: "reserved" } },
      { session }
    );

    if (updateResult.modifiedCount !== seatNumbers.length) {
      const error = new Error("Some selected seats are no longer available.");
      error.statusCode = 409;
      throw error;
    }

    const expiresAt = new Date(Date.now() + RESERVATION_DURATION_MS);

    const [reservation] = await Reservation.create(
      [{ userId, eventId, seatNumbers, status: "active", expiresAt }],
      { session }
    );

    await Seat.updateMany(
      { eventId, seatNumber: { $in: seatNumbers } },
      { $set: { reservationId: reservation._id } },
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

export const getActiveReservationByUser = async (userId) => {
  const reservation = await Reservation.findOne({
    userId,
    status: "active",
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  return reservation;
};