const RoleRepository = require("../repository/role-repository");

class RoleService {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async createRole(roleData) {
    const role = await this.roleRepository.createRole(roleData);
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.getAllRoles();
    return roles;
  }
}

module.exports = RoleService;