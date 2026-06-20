import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formattedDate = event?.dateTime
    ? new Date(event.dateTime).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-border-dark bg-surface-dark shadow-card hover:shadow-card-hover"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="p-lg">
        <span className="inline-block rounded-full bg-primary/10 px-sm py-xs text-caption font-medium uppercase tracking-wide text-primary">
          {event?.totalSeats > 0 ? `${event.totalSeats} seats` : "Event"}
        </span>

        <h3 className="mt-md line-clamp-2 text-h5 font-semibold text-textPrimaryDark">
          {event?.name}
        </h3>

        <div className="mt-md space-y-xs">
          <div className="flex items-center gap-xs text-body-sm text-textSecondaryDark">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-xs text-body-sm text-textSecondaryDark">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event?.venue}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/events/${event?._id}`)}
          className="mt-lg w-full rounded-lg bg-primary py-sm text-body-sm font-semibold text-white shadow-button transition hover:bg-primary-dark active:scale-[0.97]"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;