import Event from "../models/Event.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ dateTime: 1 });

    return successResponse(res, "Events fetched successfully", { events });
  } catch (error) {
    return next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return errorResponse(res, "Event not found", [], 404);
    }

    return successResponse(res, "Event fetched successfully", { event });
  } catch (error) {
    return next(error);
  }
};