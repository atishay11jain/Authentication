const {StatusCodes} = require('http-status-codes');
const RoleService = require('../services/role-service');

const roleService = new RoleService();

async function createRole(req, res){
    try {
        const role = await roleService.createRole(req.body);
        res.status(StatusCodes.CREATED).json({
            message: "Role created successfully",
            data: role
        });
    } catch (error) {
        next(error);
    }
}

async function getAllRoles(req, res) {
    try {
        const roles = await roleService.getAllRoles();
        res.status(StatusCodes.OK).json({
            message: "Roles retrieved successfully",
            roles
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createRole,
    getAllRoles
};