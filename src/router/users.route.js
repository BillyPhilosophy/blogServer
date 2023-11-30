const Route = require("koa-router");
const userRoute = new Route({ prefix: "/users" });

const { userValidator, userExist, crpytPassword, verifyLogin, verifyPwd, tokenRefersh } = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

const { register, login, modifyUserPwd, getUserSimpleInfo, getUserAllInfo } = require("../controller/user.controller"); //将业务逻辑抽取到controller

// 定义用户模型组
/**
* @swagger
* tags:
*   name: Users
*   description: 用户相关模块
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
* /modifyUserPwd:
*   patch:
*     security:
*       - bearerAuth: []
*     summary: 修改密码
*     servers:
*       - url: '/users'
*     tags: [Users]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/ModifyUserPwd'
*     responses:
*       200:
*         description: 修改成功.
*/
userRoute.patch("/modifyUserPwd", auth, verifyPwd, crpytPassword, modifyUserPwd, tokenRefersh);

// 查询用户基础信息接口
/**
* @swagger
* components:
*   schemas:
*     BaseInfo:
*       type: object
*       properties:
*         userNo:
*           type: string
*           description: 用户编号
*         avatar:
*           type: string
*           description: 用户头像
*         user_name:
*           type: string
*           description: 用户名
*         nick_name:
*           type: string
*           description: 昵称
*         role:
*           type: Integer
*           description: 角色
*         introduce:
*           type: string
*           description: 个人简介
*/
/**
* @swagger
* /baseInfo:
*   get:
*     security:
*       - bearerAuth: []
*     summary: 查询用户基础信息接口
*     servers:
*       - url: '/users'
*     tags: [Users]
*     responses:
*       200:
*         description: A list of users.
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/BaseInfo'
*/
userRoute.get("/baseInfo", auth, getUserSimpleInfo);

// 查询用户全部信息/除隐私信息
/**
* @swagger
* components:
*   schemas:
*     AllInfo:
*       type: object
*       properties:
*         userNo:
*           type: string
*           description: 用户编号
*         avatar:
*           type: string
*           description: 用户头像
*         user_name:
*           type: string
*           description: 用户名
*         nick_name:
*           type: string
*           description: 昵称
*         role:
*           type: Integer
*           description: 角色
*         introduce:
*           type: string
*           description: 个人简介
*         banner:
*           type: string
*           description: 用户自定义banner图
*         gender:
*           type: string
*           description: 性别
*         email:
*           type: string
*           description: 邮箱
*         date:
*           type: string
*           description: 生日(yyyymmdd)
*/
/**
* @swagger
* /allInfo:
*   get:
*     security:
*       - bearerAuth: []
*     summary: 查询用户全部信息/除隐私信息
*     servers:
*       - url: '/users'
*     tags: [Users]
*     responses:
*       200:
*         description: 返回相关用户的全部信息
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/AllInfo'
*/
userRoute.get("/allInfo", auth, getUserAllInfo); 
module.exports = userRoute;
