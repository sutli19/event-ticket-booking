import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RESERVATION_STATUS = ["active", "confirmed", "expired", "cancelled"];

const reservationSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required"],
    },
    seatNumbers: {
      type: [String],
      required: [true, "Seat numbers are required"],
      validate: [
        {
          validator: (arr) => Array.isArray(arr) && arr.length > 0,
          message: "At least one seat number is required",
        },
        {
          validator: (arr) => new Set(arr).size === arr.length,
          message: "Seat numbers must be unique within the reservation",
        },
      ],
    },
    status: {
      type: String,
      enum: {
        values: RESERVATION_STATUS,
        message: "Status must be one of: active, confirmed, expired, cancelled",
      },
      default: "active",
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiry time is required"],
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.index({ eventId: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Reservation = model("Reservation", reservationSchema);

export default Reservation;