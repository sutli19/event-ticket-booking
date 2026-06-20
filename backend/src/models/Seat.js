import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SEAT_STATUS = ["available", "reserved", "booked"];

const seatSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required"],
    },
    seatNumber: {
      type: String,
      required: [true, "Seat number is required"],
      trim: true,
      maxlength: [10, "Seat number must not exceed 10 characters"],
    },
    status: {
      type: String,
      enum: {
        values: SEAT_STATUS,
        message: "Status must be one of: available, reserved, booked",
      },
      default: "available",
    },
    reservationId: {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

seatSchema.index({ eventId: 1, seatNumber: 1 }, { unique: true });
seatSchema.index({ eventId: 1, status: 1 });
seatSchema.index({ reservationId: 1 });

const Seat = model("Seat", seatSchema);

export default Seat;