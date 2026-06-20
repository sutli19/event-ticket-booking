import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosClient from "../api/axiosClient";
import { isAuthenticated } from "../utils/auth";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axiosClient.get(`/events/${id}`);
        setEvent(response.data?.event || null);
      } catch (err) {
        setError(err.message || "Failed to load event details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSelectSeats = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    navigate(`/events/${id}/seats`);
  };

  const formattedDate = event
    ? new Date(event.dateTime).toLocaleString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="min-h-screen bg-background px-lg py-2xl">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="mb-lg flex items-center gap-xs text-body-sm text-textSecondaryDark transition hover:text-textPrimaryDark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>

        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary" />
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-border-dark bg-surface-dark p-xl text-center">
            <p className="text-body-md text-danger">{error}</p>
          </div>
        )}

        {!isLoading && !error && event && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border border-border-dark bg-surface-dark shadow-card"
          >
            <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

            <div className="p-2xl">
              <span className="inline-block rounded-full bg-accent/10 px-md py-xs text-caption font-medium uppercase tracking-wide text-accent">
                Live Event
              </span>

              <h1 className="mt-md text-h2 font-bold text-textPrimaryDark">
                {event.name}
              </h1>

              <div className="mt-xl grid grid-cols-1 gap-lg sm:grid-cols-3">
                <div className="rounded-xl bg-surface-muted p-lg">
                  <p className="text-caption uppercase tracking-wide text-textSecondaryDark">
                    Date & Time
                  </p>
                  <p className="mt-xs text-body-md font-semibold text-textPrimaryDark">
                    {formattedDate}
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted p-lg">
                  <p className="text-caption uppercase tracking-wide text-textSecondaryDark">
                    Venue
                  </p>
                  <p className="mt-xs text-body-md font-semibold text-textPrimaryDark">
                    {event.venue}
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted p-lg">
                  <p className="text-caption uppercase tracking-wide text-textSecondaryDark">
                    Total Seats
                  </p>
                  <p className="mt-xs text-body-md font-semibold text-textPrimaryDark">
                    {event.totalSeats}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSelectSeats}
                className="mt-2xl w-full rounded-xl bg-primary py-md text-body-md font-semibold text-white shadow-button transition hover:scale-[1.02] hover:bg-primary-dark active:scale-[0.98]"
              >
                Select Seats
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;