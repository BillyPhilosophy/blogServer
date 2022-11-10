const {createUser} = require('../service/users.service');

class UserController {
  // 异步不阻塞服务
  async register(ctx, next) {
    // 1.读取请求体
    // ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
    // 2.写入数据库
    // todo:
    const {user_name,password} = ctx.request.body;
    const res = await createUser(user_name,password)
    // 3.返回
    ctx.body = res;
  }
  async login(ctx, next) {
    ctx.body = "登陆成功";
  }
}

module.exports = new UserController();
