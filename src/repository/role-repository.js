const { Role } = require("../models/index");

class RoleRepository{
    async getAllRoles(filterData) {
        const allRoles = await Role.findAll(filterData);
        return allRoles;
    }

    async createRole(roleData){
      const role = await Role.create(roleData);
      return role;
    }
}

module.exports = RoleRepository;