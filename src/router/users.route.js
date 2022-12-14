const Route = require("koa-router");

const userRoute = new Route({ prefix: "/users" });

const { userValidator, userExist, crpytPassword, verifyLogin, verifyPwd } = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

const { register, login, modifyUserPwd } = require("../controller/user.controller"); //将业务逻辑抽取到controller

// 注册接口
userRoute.post("/register", userValidator, userExist, crpytPassword, register);
userRoute.post("/login", userValidator, verifyLogin, login);
userRoute.patch("/", auth, verifyPwd , crpytPassword, modifyUserPwd);

module.exports = userRoute;
