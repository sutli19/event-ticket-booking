import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";

dotenv.config();

const ROWS = ["A", "B", "C", "D", "E", "F"];
const SEATS_PER_ROW = 10;
const TOTAL_SEATS = ROWS.length * SEATS_PER_ROW;

const EVENTS_DATA = [
  {
    name: "Coldplay - Music of the Spheres",
    venue: "DY Patil Stadium, Navi Mumbai",
    dateTime: new Date("2026-08-15T19:00:00.000Z"),
    totalSeats: TOTAL_SEATS,
  },
  {
    name: "Stand-Up Comedy Night",
    venue: "The Habitat, Mumbai",
    dateTime: new Date("2026-07-10T20:00:00.000Z"),
    totalSeats: TOTAL_SEATS,
  },
  {
    name: "Marvel Fan Premiere",
    venue: "PVR ICON, Lower Parel",
    dateTime: new Date("2026-09-05T18:30:00.000Z"),
    totalSeats: TOTAL_SEATS,
  },
  {
    name: "IPL Final Screening",
    venue: "Wankhede Stadium Fan Zone, Mumbai",
    dateTime: new Date("2026-07-26T19:30:00.000Z"),
    totalSeats: TOTAL_SEATS,
  },
  {
    name: "Tech Conference 2026",
    venue: "Jio World Convention Centre, BKC",
    dateTime: new Date("2026-08-22T09:00:00.000Z"),
    totalSeats: TOTAL_SEATS,
  },
];

const generateSeatsForEvent = (eventId) => {
  const seats = [];

  for (const row of ROWS) {
    for (let col = 1; col <= SEATS_PER_ROW; col += 1) {
      seats.push({
        eventId,
        seatNumber: `${row}${col}`,
        status: "available",
      });
    }
  }

  return seats;
};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("[Seed] Connected to MongoDB");

    await Promise.all([
      Event.deleteMany({}),
      Seat.deleteMany({}),
      Reservation.deleteMany({}),
    ]);
    console.log("[Seed] Cleared existing Events, Seats, and Reservations");

    const createdEvents = await Event.insertMany(EVENTS_DATA);
    console.log(`[Seed] Created ${createdEvents.length} events`);

    let allSeats = [];

    for (const event of createdEvents) {
      const seatsForEvent = generateSeatsForEvent(event._id);
      allSeats = allSeats.concat(seatsForEvent);
    }

    await Seat.insertMany(allSeats);
    console.log(`[Seed] Created ${allSeats.length} seats`);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(`[Seed] Failed to seed database: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("[Seed] Database connection closed");
  }
};

seedDatabase();