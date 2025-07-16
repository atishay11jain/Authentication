const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');
const RoleController = require('../controllers/role-controller');
const AuthMiddleware = require('../middlewares/auth-middleware');
const RoleMiddleware = require('../middlewares/role-middleware');

router.post('/auth/signup', AuthMiddleware.validateSignUpRequest, UserController.signup);
router.post('/auth/signin', AuthMiddleware.validateSignInRequest, UserController.signin);
router.get('/auth/verify', AuthMiddleware.validateUserVerificationRequest, UserController.verifyUser);

router.post('/role', RoleMiddleware.validateCreateRoleRequest, RoleController.createRole);
router.get('/roles', RoleController.getAllRoles);

module.exports = router;