const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { createUser,getUserPrivacyInfo,updateById,getUserInfo} = require('../service/users.service');
const { userRegisterError, modifyPwdError,getUserInfoError } = require('../constants/err.type');
// const {COOKIENAME} = require('../constants')


class UserController {
  // 注册
  async register(ctx, next) {
    // 1.读取请求体
    const {username,password,nickname} = ctx.request.body;
    // 2.写入数据库
    try {
      const res = await createUser(username,password,nickname);
      const tokenPayload = {
        id:res.id,
        username:res.username,
        nickname:res.nickname,
      };
      console.log('res=====',res);
      // 3.返回
      ctx.body = {
        returnCode:0,
        returnMsg:'注册成功！',
        body:{
          id:res.id,
          username:res.username,
          nickname:res.nickname,
          token:jwt.sign(tokenPayload,JWT_SECRET,{expiresIn:'1d'})
        }
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit('error',userRegisterError,ctx);
    }
    
  }
  // 登录
  async login(ctx, next) {
    const {username} = ctx.request.body;
    // 如果从上一个中间件带下来了参数
    if(ctx.state?.tokenPayload){
      try {
        const tokenPayload = ctx.state.tokenPayload;
        
        ctx.body = {
          returnCode:0,
          returnMsg:`登录成功,欢迎${username}再次回到秘密基地！`,
          body:{
            token:jwt.sign(tokenPayload,JWT_SECRET,{expiresIn:'1d'})
          }
        };
      } catch (error) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)//登录异常报错
      }
    }else{//意外丢失了就再获取一次
      try {
        const tokenPayload = await getUserPrivacyInfo({username});
        ctx.body = {
          returnCode:0,
          returnMsg:`登录成功,欢迎${username}再次回到秘密基地！`,
          body:{
            token:jwt.sign(tokenPayload,JWT_SECRET,{expiresIn:'1d'})
          }
        };
      } catch (error) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)//登录异常报错
      }
    }
  }
  // 修改密码
  async modifyUserPwd(ctx, next){
    const id = ctx.state.user.id;
    const {password} = ctx.request.body;
    if(await updateById(id,{password})){
      ctx.state.user.password = password;
      await next();
     
    }else{
      return ctx.app.emit('error',modifyPwdError,ctx);
    }
  }
  // 获取用户简单信息
  async getUserSimpleInfo(ctx, next){
    const id = ctx.state.user.id;
    // 基础信息包括用户名，昵称，
    const res = await getUserInfo({id},['avatar','userNo','username','nickname','role','introduce'])
    if(res){
      return ctx.body = {
        returnCode:0,
        returnMsg:'查询成功',
        body:res
      };
    }else{
      return ctx.app.emit('error',getUserInfoError,ctx);
    }
  }
  // 获取用户全面信息
  async getUserAllInfo(ctx, next){
    const id = ctx.state.user.id;
    // 基础信息包括用户名，昵称，
    const res = await getUserInfo({id},['avatar','userNo','username','nickname','role','introduce','banner','gender','email','date'])
    if(res){
      return ctx.body = {
        returnCode:0,
        returnMsg:'查询成功',
        body:res
      };
    }else{
      return ctx.app.emit('error',getUserInfoError,ctx);
    }
  }
}

module.exports = new UserController();
