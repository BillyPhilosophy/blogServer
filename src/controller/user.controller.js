const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { createUser,getUserInfo,updateById} = require('../service/users.service');
const { userRegisterError, modifyPwdError } = require('../constants/err.type');
// const {COOKIENAME} = require('../constants')


class UserController {
  // 异步不阻塞服务
  async register(ctx, next) {
    // 1.读取请求体
    const {user_name,password} = ctx.request.body;
    // 2.写入数据库
    try {
      const res = await createUser(user_name,password);
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
  async login(ctx, next) {
    const {user_name} = ctx.request.body;
    // 如果从上一个中间件带下来了参数
    if(ctx.state?.tokenPayload){
      try {
        const tokenPayload = ctx.state.tokenPayload;
        // ctx.cookies.set(COOKIENAME,jwt.sign(tokenPayload,JWT_SECRET,{expiresIn:'1d'}));//todo搞成setcookie校验cookie
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
        const tokenPayload = await getUserInfo({user_name});
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
}

module.exports = new UserController();
