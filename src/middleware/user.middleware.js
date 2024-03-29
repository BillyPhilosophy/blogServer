const { schemaRegister } = require("../validator/users.validator");
const { getUserPrivacyInfo } = require('../service/users.service');
const { userParamError,userExistError,userRegisterError,userDoesNotExist,invalidPassword,userLoginError,pwdConsistencyError } = require('../constants/err.type')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

const userValidator = async (ctx, next) => {
  console.log( 'ctx.request===',ctx.request);
  const { username, password } = ctx.request.body;
  // 合法性参数校验
  try {
    await schemaRegister.validateAsync({ username, password });
  } catch (error) {
    console.error('用户名或密码不符合校验', { username, password });
    const MSG = error.details.reduce(
      (prev, cur) => prev + cur.message + "  ",
      ""
    );
    return ctx.app.emit('error',userParamError(MSG),ctx);
  }
  await next();
};

const userExist = async (ctx,next)=>{//校验用户是否已存在
  const { username } = ctx.request.body;
  try {
    const res = await getUserPrivacyInfo({username});
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
  const { username, password } = ctx.request.body;
  // 合法性参数校验
  try {
    const res = await getUserPrivacyInfo({username});
    if(!res){
      console.error('用户名不存在', { username });
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
    return ctx.app.emit('error',userParamError(error),ctx);
  }
  
  await next();
}

// 刷新token
const tokenRefersh = async (ctx,next)=>{
  // 重新签token
  jwt.sign(ctx.state.user,JWT_SECRET,{expiresIn:'1d'})
  return ctx.body = {
    returnCode:0,
    returnMsg:'请重新登录！',
    body:null
  };
}




module.exports = {
  userValidator,
  userExist,
  crpytPassword,
  verifyLogin,
  verifyPwd,
  tokenRefersh
}
