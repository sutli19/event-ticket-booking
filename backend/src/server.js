import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./config/env.js";
import { startReservationExpiryJob } from "./jobs/expireReservations.cron.js";

const bootstrap = async () => {
  try {
    await connectDB();

    startReservationExpiryJob();

    app.listen(PORT, () => {
      console.log(`[Server] Running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`[Server] Failed to start: ${error.message}`);
    process.exit(1);
  }
};

bootstrap();