const { StatusCodes } = require("http-status-codes");
const db = require("../models/index");
const { User, Role } = require("../models/index");
const AppError = require("../utils/app-error");
const RoleRepository = require("./role-repository"); // Assuming you have a RoleRepository to handle roles

class UserRepository {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async createuser(userData) {
    const user = await User.create(userData);
    return user;
  }

  async createUserWithRoles(userData, userRoles) {
    const t = await db.sequelize.transaction();
    try {
      const roles = await this.roleRepository.getAllRoles({
        where: {
          name: userRoles,
        },
        transaction: t,
      });
      if (roles.length !== userRoles.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid roles provided");
      }
      const user = await this.createuser(userData, { transaction: t });
      await user.addRoles(roles, { transaction: t });
      await t.commit();
      return user;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      where: { email },
      include: Role
    });
    return user;
  }
}

module.exports = UserRepository;
