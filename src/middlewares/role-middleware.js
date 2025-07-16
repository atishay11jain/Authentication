const {StatusCodes} = require('http-status-codes');

const validateCreateRoleRequest = (req, res, next) => {
    if(req.body && req.body.name){
        return next();
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid Data To create role"
    });
};

module.exports = {
    validateCreateRoleRequest
};