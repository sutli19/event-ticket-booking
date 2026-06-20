import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      minlength: [2, "Event name must be at least 2 characters"],
      maxlength: [150, "Event name must not exceed 150 characters"],
    },
    dateTime: {
      type: Date,
      required: [true, "Event date/time is required"],
      validate: {
        validator: (value) => value instanceof Date && !isNaN(value),
        message: "Invalid date/time provided",
      },
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
      minlength: [2, "Venue must be at least 2 characters"],
      maxlength: [200, "Venue must not exceed 200 characters"],
    },
    totalSeats: {
      type: Number,
      required: [true, "Total seats is required"],
      min: [1, "Total seats must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Total seats must be an integer",
      },
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ dateTime: 1 });
eventSchema.index({ name: "text", venue: "text" });

const Event = model("Event", eventSchema);

export default Event;