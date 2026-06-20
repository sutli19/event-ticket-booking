import cron from "node-cron";
import { releaseExpiredReservations } from "../services/expiry.service.js";

export const startReservationExpiryJob = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      const releasedCount = await releaseExpiredReservations();
      console.log(`Released ${releasedCount} expired reservations`);
    } catch (error) {
      console.error(
        `[ExpiryJob] Error releasing expired reservations: ${error.message}`
      );
    }
  });

  console.log("[ExpiryJob] Reservation expiry job started (runs every 30 seconds)");
};