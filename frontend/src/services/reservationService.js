import axiosClient from "../api/axiosClient";

export const reserveSeats = ({ userId, eventId, seatNumbers }) => {
  return axiosClient.post("/reserve", { userId, eventId, seatNumbers });
};

export const confirmBooking = (reservationId) => {
  return axiosClient.post("/bookings", { reservationId });
};

export const getActiveReservation = (userId) => {
  return axiosClient.get(`/reservations/user/${userId}`);
};