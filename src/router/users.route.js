const Route = require("koa-router");

const userRoute = new Route({ prefix: "/users" });

const { userValidator, userExist, crpytPassword, verifyLogin, verifyPwd } = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

const { register, login, modifyUserPwd } = require("../controller/user.controller"); //将业务逻辑抽取到controller
// 定义用户模型组
/**
* @swagger
* tags:
*   name: Users
*   description: User management
*/


// 注册接口
/**
* @swagger
* components:
*   schemas:
*     Register:
*       type: object
*       properties:
*         user_name:
*           type: string
*           description: uname.
*         password:
*           type: string
*           description: pwd.
*       required:
*         - user_name
*         - password
*/
/**
* @swagger
* /register:
*   post:
*     summary: 用户注册
*     servers:
*       - url: '/users'
*     tags: [Users]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Register'
*     responses:
*       200:
*         description: A list of users.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Register'
*/
userRoute.post("/register", userValidator, userExist, crpytPassword, register);
// 登录接口
userRoute.post("/login", userValidator, verifyLogin, login);
// 修改接口
userRoute.patch("/", auth, verifyPwd, crpytPassword, modifyUserPwd);
// 查询接口
userRoute.get("/info", auth);
module.exports = userRoute;
