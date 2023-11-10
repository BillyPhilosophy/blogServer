const Route = require("koa-router");

const userRoute = new Route({ prefix: "/users" });

const { userValidator, userExist, crpytPassword, verifyLogin, verifyPwd } = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

const { register, login, modifyUserPwd, getUserSimpleInfo, getUserAllInfo } = require("../controller/user.controller"); //将业务逻辑抽取到controller
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
/**
* @swagger
* components:
*   schemas:
*     Login:
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
* /login:
*   post:
*     summary: 用户登录
*     servers:
*       - url: '/users'
*     tags: [Users]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Login'
*     responses:
*       200:
*         description: A list of users.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Login'
*/
userRoute.post("/login", userValidator, verifyLogin, login);

// 修改密码接口
/**
* @swagger
* components:
*   schemas:
*     ModifyUserPwd:
*       type: object
*       properties:
*         password:
*           type: string
*           description: pwd.
*       required:
*         - password
*/

/**
* @swagger
* /modifyUserPwd:
*   patch:
*     summary: 修改密码
*     servers:
*       - url: '/users'
*     tags: [Users]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/ModifyUserPwd'
*     parameters:
*       - in: header
*         name: Authorization
*         required: true
*         description: Bearer Token for authentication
*         schema:
*            type: string
*     responses:
*       200:
*         description: A list of users.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/ModifyUserPwd'
*/
userRoute.patch("/modifyUserPwd", auth, verifyPwd, crpytPassword, modifyUserPwd);
// 查询用户基础信息接口
userRoute.get("/baseInfo", auth, getUserSimpleInfo);
// 查询用户全部信息/除隐私信息
userRoute.get("/allInfo", auth, getUserAllInfo); 
module.exports = userRoute;
