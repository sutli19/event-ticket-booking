import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "../api/axiosClient";
import EventCard from "../components/events/EventCard";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axiosClient.get("/events");
        console.log(response);
setEvents(response.data?.events || []);
        setEvents(response.data?.events || []);
      } catch (err) {
        setError(err.message || "Failed to load events. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-30 border-b border-border-dark bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-lg py-md">
          <div className="flex items-center gap-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-bold text-white">
              E
            </div>
            <span className="text-h6 font-semibold text-textPrimaryDark">
              EventHub
            </span>
          </div>
          <span className="text-body-sm text-textSecondaryDark">
            Book tickets in seconds
          </span>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-border-dark px-lg py-3xl">
        <div className="mx-auto max-w-7xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-h1 font-bold text-textPrimaryDark"
          >
            Find Your Next <span className="text-accent">Live Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="mx-auto mt-md max-w-2xl text-body-lg text-textSecondaryDark"
          >
            Discover concerts, shows, and events near you — reserve your seats
            instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-xl max-w-xl"
          >
            <div className="flex items-center gap-sm rounded-xl border border-border-dark bg-surface-dark px-md py-sm shadow-card">
              <svg
                className="h-5 w-5 flex-shrink-0 text-textSecondaryDark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events by name or venue..."
                className="w-full bg-transparent text-body-md text-textPrimaryDark placeholder:text-textSecondaryDark focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-lg py-2xl">
        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="flex flex-col items-center gap-md">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary" />
              <p className="text-body-sm text-textSecondaryDark">
                Loading events...
              </p>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-md text-center">
            <div className="rounded-full bg-danger/10 p-md">
              <svg
                className="h-8 w-8 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-body-md text-textPrimaryDark">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-primary px-lg py-sm text-body-sm font-medium text-white shadow-button transition hover:bg-primary-dark"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-body-md text-textSecondaryDark">
              No events found.
            </p>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default EventListPage;