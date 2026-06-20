const RESERVATION_ID_KEY = "reservationId";

export const getStoredReservationId = () => {
  return localStorage.getItem(RESERVATION_ID_KEY);
};

export const setStoredReservationId = (reservationId) => {
  localStorage.setItem(RESERVATION_ID_KEY, reservationId);
};

export const clearStoredReservationId = () => {
  localStorage.removeItem(RESERVATION_ID_KEY);
};