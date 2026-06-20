import { useCallback, useEffect, useState } from "react";
import { getSeatsByEventId } from "../services/eventService";

const useSeats = (eventId) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeats = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await getSeatsByEventId(eventId);
      setSeats(response.data?.seats || []);
    } catch (err) {
      setError(err.message || "Failed to load seats.");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  const refreshSeats = () => {
    fetchSeats();
  };

  return { seats, loading, error, refreshSeats };
};

export default useSeats;