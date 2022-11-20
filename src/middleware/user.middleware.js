const { schemaRegister } = require("../validator/users.validator");
const { getUserInfo } = require('../service/users.service');
const { userParamError,userExistError,userRegisterError,userDoesNotExist,invalidPassword,userLoginError,pwdConsistencyError } = require('../constants/err.type')
const bcrypt = require('bcryptjs');

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性参数校验
  try {
    await schemaRegister.validateAsync({ user_name, password });
  } catch (error) {
    console.error('用户名或密码不符合校验', { user_name, password });
    const MSG = error.details.reduce(
      (prev, cur) => prev + cur.message + "  ",
      ""
    );
    return ctx.app.emit('error',userParamError(MSG),ctx);
  }
  await next();
};

const userExist = async (ctx,next)=>{//校验用户是否已存在
  const { user_name } = ctx.request.body;
  try {
    const res = await getUserInfo({user_name});
    if(res){
      return ctx.app.emit('error',userExistError,ctx);
    }
  } catch (error) {
    console.error('用户名已存在', {username});
    return ctx.app.emit('error',userRegisterError,ctx)
  }
  
  await next();
}
// 密码加密
const crpytPassword = async (ctx,next)=>{
  const {password} = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);//密文生成
  ctx.request.body.password = hash;

  await next();
}

// 登录校验
const verifyLogin = async (ctx,next)=>{
  const { user_name, password } = ctx.request.body;
  // 合法性参数校验
  try {
    const res = await getUserInfo({user_name});
    if(!res){
      console.error('用户名不存在', { user_name });
      return ctx.app.emit('error',userDoesNotExist,ctx);
    }
    // 密码校验
    if(!bcrypt.compareSync(password, res.password)){
      return ctx.app.emit('error',invalidPassword,ctx);
    }
    ctx.state.tokenPayload = res;//为生成token的payload而做准备
  } catch (error) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)//登录异常报错
  }
  await next()
}

// 密码校验（两次密码相同则不调用）
const verifyPwd = async (ctx,next)=>{
  try {
    const {password} = ctx.state.user;
    const newPwd = ctx.request.body.password;
    if(bcrypt.compareSync(newPwd, password)){
      return ctx.app.emit('error',pwdConsistencyError,ctx)
    }
  } catch (error) {
    console.log('error',error);
  }
  
  await next();
}



module.exports = {
  userValidator,
  userExist,
  crpytPassword,
  verifyLogin,
  verifyPwd
}
