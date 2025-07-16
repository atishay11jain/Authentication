const { StatusCodes } = require("http-status-codes");
const { validateEmail, validatePassword } = require("../utils/helper");

const validateSignUpRequest = (req, res, next) => {
  if(!req.body.roles || !Array.isArray(req.body.roles)) {
    req.body.roles = JSON.parse(req.body.roles || "[]");
  }

  if (
    req.body &&
    req.body.name && isNaN(req.body.name) &&
    validateEmail(req.body.email) &&
    validatePassword(req.body.password) &&
    Array.isArray(req.body.roles) && req.body.roles.length > 0
  ) {
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({
    message: "Invalid request data",
  });
};

const validateSignInRequest = (req, res, next) => {
  if (
    req.body &&
    validateEmail(req.body.email) &&
    validatePassword(req.body.password)
  ) {
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({
    message: "Invalid request data",
  });
};

const validateUserVerificationRequest = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    return next();
  }
  return res.status(StatusCodes.UNAUTHORIZED).json({
    message: "Unauthorized access, No Token provided",
  });
}

module.exports = {
  validateSignUpRequest,
  validateSignInRequest,
  validateUserVerificationRequest
};
