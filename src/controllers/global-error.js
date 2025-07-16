const { StatusCodes } = require("http-status-codes");

const globalErrorHandler = (error, req, res, next) => {
  console.error("Global Error handler: ", error);
  if (error.name.startsWith("Sequelize")) {
    if (error.name === "SequelizeValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors.map((err) => err.message).join(", "),
      });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(StatusCodes.CONFLICT).json({
        message: error.errors.map((err) => err.message).join(", "),
      });
    }
  }

  if(error.isOperational) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    user: {},
    message: "Internal Server Error",
  });
};

module.exports = globalErrorHandler;
