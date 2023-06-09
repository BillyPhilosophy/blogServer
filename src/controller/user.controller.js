const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { createUser,getUserInfoBase,updateById} = require('../service/users.service');
const { userRegisterError, modifyPwdError } = require('../constants/err.type');
// const {COOKIENAME} = require('../constants')


class UserController {
  // 注册
  async register(ctx, next) {
    // 1.读取请求体
    const {user_name,password} = ctx.request.body;
    // 2.写入数据库
    try {
      const res = await createUser(user_name,password);
      console.log('res=====',res);
      // 3.返回
      ctx.body = {
        returnCode:0,
        returnMsg:'注册成功！',
        body:{
          id:res.id,
          user_name:res.user_name
        }
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit('error',userRegisterError,ctx);
    }
    
  }
  // 登录
  async login(ctx, next) {
    const {user_name} = ctx.request.body;
    // 如果从上一个中间件带下来了参数
    if(ctx.state?.tokenPayload){
      try {
        const tokenPayload = ctx.state.tokenPayload;
        
        ctx.body = {
          returnCode:0,
          returnMsg:`登录成功,欢迎${user_name}再次回到秘密基地！`,
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
        const tokenPayload = await getUserInfoBase({user_name});
        ctx.body = {
          returnCode:0,
          returnMsg:`登录成功,欢迎${user_name}再次回到秘密基地！`,
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
      return ctx.body = {
        returnCode:0,
        returnMsg:'修改成功！',
        body:null
      };
    }else{
      return ctx.app.emit('error',modifyPwdError,ctx);
    }
  }
  // 获取用户简单信息

  // 获取用户全面信息
}

module.exports = new UserController();
