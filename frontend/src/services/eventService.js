import axiosClient from "../api/axiosClient";

export const getAllEvents = () => {
  return axiosClient.get("/events");
};

export const getEventById = (id) => {
  return axiosClient.get(`/events/${id}`);
};

export const getSeatsByEventId = (eventId) => {
  return axiosClient.get(`/seats/${eventId}`);
};