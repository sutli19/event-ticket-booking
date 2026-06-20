import { validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return errorResponse(res, "Validation failed", formattedErrors, 400);
  }

  return next();
};

export default validateRequest; 