import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const mongoUri = MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    console.log("Mongo URI:", mongoUri);
    const conn = await mongoose.connect(mongoUri, {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on("disconnected", () => {
      console.warn("[MongoDB] Disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("[MongoDB] Reconnected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`[MongoDB] Connection error: ${err.message}`);
    });

    const gracefulShutdown = async (signal) => {
      try {
        await mongoose.connection.close();
        console.log(`[MongoDB] Connection closed due to ${signal}`);
        process.exit(0);
      } catch (err) {
        console.error(`[MongoDB] Error during graceful shutdown: ${err.message}`);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;