import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { confirmBooking } from "../services/reservationService";
import ReservationTimer from "../components/booking/ReservationTimer";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { reservation, event } = location.state || {};

  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!reservation || !event) {
      navigate("/");
    }
  }, [reservation, event, navigate]);

  if (!reservation || !event) {
    return null;
  }

  const handleExpire = () => {
    setIsExpired(true);
    toast.error("Reservation expired");
    navigate("/");
  };

  const handleBookNow = async () => {
    if (isExpired) {
      toast.error("Reservation expired. Please select seats again.");
      return;
    }

    setIsBooking(true);

    try {
      await confirmBooking(reservation._id);
      toast.success("Booking confirmed successfully!");
      setIsConfirmed(true);
    } catch (err) {
      toast.error(err.message || "Failed to confirm booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-border-dark bg-surface-dark p-2xl text-center shadow-modal"
      >
        {!isConfirmed && (
          <div className="mb-xl">
            <ReservationTimer
              expiresAt={reservation.expiresAt}
              onExpire={handleExpire}
            />
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            isConfirmed ? "bg-success/10" : "bg-warning/10"
          }`}
        >
          <svg
            className={`h-10 w-10 ${isConfirmed ? "text-success" : "text-warning"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isConfirmed ? (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
        </motion.div>

        <h1 className="mt-xl text-h3 font-bold text-textPrimaryDark">
          {isConfirmed ? "Booking Confirmed!" : "Seats Reserved"}
        </h1>
        <p className="mt-sm text-body-md text-textSecondaryDark">
          {isConfirmed
            ? "Your seats have been successfully booked."
            : "Complete your booking before the reservation expires."}
        </p>

        <div className="mt-xl space-y-md rounded-xl bg-surface-muted p-lg text-left">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-textSecondaryDark">Event</span>
            <span className="text-body-sm font-semibold text-textPrimaryDark">
              {event.name}
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-body-sm text-textSecondaryDark">Seats</span>
            <div className="flex flex-wrap justify-end gap-xs">
              {reservation.seatNumbers.map((seat) => (
                <span
                  key={seat}
                  className="rounded-md bg-primary/10 px-sm py-xs text-caption font-medium text-primary"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-body-sm text-textSecondaryDark">Status</span>
            <span
              className={`rounded-full px-sm py-xs text-caption font-semibold uppercase ${
                isConfirmed
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }`}
            >
              {isConfirmed ? "confirmed" : reservation.status}
            </span>
          </div>
        </div>

        <div className="mt-2xl flex flex-col gap-sm">
          {!isConfirmed && (
            <button
              onClick={handleBookNow}
              disabled={isBooking || isExpired}
              className={`w-full rounded-xl py-md text-body-md font-semibold shadow-button transition ${
                isBooking || isExpired
                  ? "cursor-not-allowed bg-surface-muted text-textSecondaryDark"
                  : "bg-primary text-white hover:scale-[1.02] hover:bg-primary-dark active:scale-[0.98]"
              }`}
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl border border-border-dark bg-transparent py-md text-body-md font-semibold text-textPrimaryDark transition hover:bg-surface-muted"
          >
            Back To Events
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmationPage;