import { errorResponse } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field '${err.path}'`;
    errors = [
      {
        field: err.path,
        message: `Expected a valid ${err.kind}, received '${err.value}'`,
      },
    ];
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate resource conflict";
    const duplicateFields = Object.keys(err.keyValue || {});
    errors = duplicateFields.map((field) => ({
      field,
      message: `${field} '${err.keyValue[field]}' already exists`,
    }));
  } else if (!err.statusCode) {
    statusCode = 500;
    message = "Internal Server Error";
    errors = [{ message: err.message }];
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
    return errorResponse(res, message, [...errors, { stack: err.stack }], statusCode);
  }

  return errorResponse(res, message, errors, statusCode);
};

export default errorHandler;