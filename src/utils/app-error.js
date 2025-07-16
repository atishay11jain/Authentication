const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

module.exports = AppError;
