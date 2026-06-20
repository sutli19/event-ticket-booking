import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ReservationTimer = ({ expiresAt, onExpire }) => {
  const calculateRemaining = () => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  };

  const [secondsLeft, setSecondsLeft] = useState(calculateRemaining());

  useEffect(() => {
    setSecondsLeft(calculateRemaining());

    const interval = setInterval(() => {
      setSecondsLeft(() => {
        const updated = calculateRemaining();

        if (updated <= 0) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;

  let colorClasses = "bg-success/10 text-success border-success/30";
  let shouldPulse = false;

  if (secondsLeft <= 30) {
    colorClasses = "bg-danger/10 text-danger border-danger/30";
    shouldPulse = true;
  } else if (secondsLeft <= 120) {
    colorClasses = "bg-warning/10 text-warning border-warning/30";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex justify-center"
    >
      <motion.div
        animate={shouldPulse ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={
          shouldPulse
            ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className={`inline-flex items-center gap-sm rounded-full border px-xl py-md shadow-card ${colorClasses}`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-h5 font-bold tabular-nums">{formattedTime}</span>
        <span className="text-caption uppercase tracking-wide opacity-80">
          remaining
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ReservationTimer;