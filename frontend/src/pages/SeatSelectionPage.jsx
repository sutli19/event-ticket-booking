import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useEvent from "../hooks/useEvent";
import useSeats from "../hooks/useSeats";
import { groupSeatsByRows } from "../utils/seatHelpers";
import { reserveSeats } from "../services/reservationService";
import { DEMO_USER_ID } from "../utils/constants";
import SeatLegend from "../components/seats/SeatLegend";
import SeatGrid from "../components/seats/SeatGrid";
import BookingSummary from "../components/booking/BookingSummary";

const SeatSelectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { event, loading: eventLoading, error: eventError } = useEvent(id);
  const {
    seats,
    loading: seatsLoading,
    error: seatsError,
    refreshSeats,
  } = useSeats(id);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isReserving, setIsReserving] = useState(false);

  const seatRows = useMemo(() => groupSeatsByRows(seats), [seats]);

  const isLoading = eventLoading || seatsLoading;
  const error = eventError || seatsError;

  const handleToggleSeat = (seatNumber) => {
    const seat = seats.find((s) => s.seatNumber === seatNumber);

    if (!seat || seat.status !== "available") {
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleReserveSeats = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    setIsReserving(true);

    try {
      const response = await reserveSeats({
        userId: DEMO_USER_ID,
        eventId: id,
        seatNumbers: selectedSeats,
      });

      toast.success("Seats reserved successfully");

      await refreshSeats();
      setSelectedSeats([]);

      navigate("/booking/success", {
        state: {
          reservation: response.data.reservation,
          event,
        },
      });
    } catch (err) {
      toast.error(err.message || "Failed to reserve seats. Please try again.");
      await refreshSeats();
    } finally {
      setIsReserving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-md bg-background text-center">
        <p className="text-body-md text-danger">
          {error || "Event not found."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-primary px-lg py-sm text-body-sm font-medium text-white shadow-button"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-lg py-xl">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate(`/events/${id}`)}
          className="mb-lg flex items-center gap-xs text-body-sm text-textSecondaryDark transition hover:text-textPrimaryDark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Event Details
        </button>

        <div className="mb-xl text-center">
          <h1 className="text-h3 font-bold text-textPrimaryDark">{event.name}</h1>
          <p className="mt-xs text-body-sm text-textSecondaryDark">{event.venue}</p>
        </div>

        <div className="rounded-2xl border border-border-dark bg-surface-dark p-xl shadow-card">
          <SeatLegend />

          <div className="mt-xl flex justify-center">
            <div className="mb-lg w-2/3 rounded-full bg-surface-muted py-xs text-center text-caption uppercase tracking-widest text-textSecondaryDark">
              Screen / Stage
            </div>
          </div>

          <div className="flex justify-center overflow-x-auto pb-md">
            <SeatGrid
              seatRows={seatRows}
              selectedSeats={selectedSeats}
              onToggleSeat={handleToggleSeat}
            />
          </div>
        </div>

        <div className="mt-xl">
          <BookingSummary
            eventName={event.name}
            selectedSeats={selectedSeats}
            onReserve={handleReserveSeats}
            isLoading={isReserving}
          />
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;