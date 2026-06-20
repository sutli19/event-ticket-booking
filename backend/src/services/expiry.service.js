import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import Seat from "../models/Seat.js";

export const releaseExpiredReservations = async () => {
  const expiredReservations = await Reservation.find({
    status: "active",
    expiresAt: { $lte: new Date() },
  });

  let processedCount = 0;

  for (const reservation of expiredReservations) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await Seat.updateMany(
        {
          eventId: reservation.eventId,
          seatNumber: { $in: reservation.seatNumbers },
          reservationId: reservation._id,
        },
        { $set: { status: "available", reservationId: null } },
        { session }
      );

      reservation.status = "expired";
      await reservation.save({ session });

      await session.commitTransaction();
      processedCount += 1;
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      console.error(
        `[ExpiryService] Failed to release reservation ${reservation._id}: ${error.message}`
      );
    } finally {
      session.endSession();
    }
  }

  return processedCount;
};