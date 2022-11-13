const {createUser} = require('../service/users.service');
const {userRegisterError} = require('../constants/err.type')


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
    ctx.body = "登陆成功";
  }
}

module.exports = new UserController();
