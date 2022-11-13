const Route = require("koa-router");

const userRoute = new Route({ prefix: "/users" });

const { userValidator,userExist } = require("../middleware/user.middleware");

const { register, login } = require("../controller/user.controller"); //将业务逻辑抽取到controller

// 注册接口
userRoute.post("/register", userValidator, userExist, register);
userRoute.post("/login", login);

module.exports = userRoute;
