const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");
const AppError = require("../utils/app-error");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRespository = new UserRepository();
  }

  async signup(data) {
    const inputData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const userRoles = [...new Set(data.roles)];
    const user = await this.userRespository.createUserWithRoles(
      inputData,
      userRoles
    );
    const userDetails = {
      Id: user.id,
      name: user.name,
      email: user.email,
      roles: userRoles,
    };
    const jwtToken = this.#createJwtToken(userDetails);
    return { userDetails, jwtToken };
  }

  async signin(data) {
    const userInput = { email: data.email, password: data.password };
    const userModelData = await this.userRespository.getUserByEmail(
      userInput.email
    );
    if (!userModelData) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "User not found");
    }
    const isPasswordMatched = this.#matchPassword(
      userInput.password,
      userModelData.password
    );
    if (!isPasswordMatched) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid password");
    }
    const userDetails = {
      Id: userModelData.id,
      name: userModelData.name,
      email: userModelData.email,
      roles: userModelData.Roles.map((role) => role.name),
    };
    const jwtToken = this.#createJwtToken(userDetails);
    return { userDetails, jwtToken };
  }

  async verifyUser(jwtToken) {
    return this.#verifyJwtToken(jwtToken);
  }

  #createJwtToken(user) {
    const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: "1DAY" });
    return token;
  }

  #matchPassword(inputPassword, dbPassword) {
    return bcrypt.compareSync(inputPassword, dbPassword);
  }

  #verifyJwtToken(jwtToken) {
    try {
      const user = jwt.verify(jwtToken, JWT_SECRET_KEY);
      if(user == null || user == undefined) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid JWT Token");
      }
      return user;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid or Expired JWT Token");
    }
  }
}

module.exports = UserService;
