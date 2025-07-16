const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user-service");

const userService = new UserService();
async function signup(req, res, next) {
  try {
    const userData = await userService.signup(req.body);
    return res
      .status(StatusCodes.CREATED)
      .cookie("token", userData.jwtToken, {
        Secure: false, // Set to true on production
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ message: "Signed up successfully", userDetails: userData.userDetails });
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const userData = await userService.signin(req.body);
    return res
      .status(StatusCodes.OK)
      .cookie("token", userData.jwtToken, {
        Secure: false, // Set to true on production
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Signed in successfully",
        userDetails: userData.userDetails,
      });
  } catch (error) {
    next(error);
  }
}

async function verifyUser(req, res, next){
  try{
    const user = await userService.verifyUser(req.cookies.token);
    return res.status(StatusCodes.OK).json({
      message: "User verified successfully",
      userDetails: user
    });
  }catch(error){
    res.clearCookie("token", {
      Secure: false, // Set to true on production
      httpOnly: true,
      sameSite: "strict",
    });
    next(error);
  }
}

module.exports = {
  signup,
  signin,
  verifyUser
};
