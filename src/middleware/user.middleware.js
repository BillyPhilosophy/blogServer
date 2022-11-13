const { schemaRegister } = require("../validator/users.validator");
const { getUserInfo } = require('../service/users.service');
const { userParamError,userExistError,userRegisterError} = require('../constants/err.type')
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性参数校验
  try {
    await schemaRegister.validateAsync({ user_name, password });
  } catch (error) {
    const MSG = error.details.reduce(
      (prev, cur) => prev + cur.message + "  ",
      ""
    );
    return ctx.app.emit('error',userParamError(MSG),ctx);
  }
  await next();
};

const userExist = async (ctx,next)=>{
  const { user_name } = ctx.request.body;
  try {
    const res = await getUserInfo({user_name});
    if(res){
      return ctx.app.emit('error',userExistError,ctx);
    }
  } catch (error) {
    return ctx.app.emit('error',userRegisterError,ctx)
  }
  
  await next();
}

module.exports = {
  userValidator,
  userExist
}
