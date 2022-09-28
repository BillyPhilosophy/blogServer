const Route = require("koa-router");

const userRoute = new Route({ prefix: "/users" });

const { register,login } = require("../controller/user.controller"); //将业务逻辑抽取到controller

// 注册接口
userRoute.post("/register", register);
userRoute.post("/login", login);

module.exports = userRoute;
