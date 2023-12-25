const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')

const {tokenExpiredError,jsonWebTokenError,notBeforeError,tokenNonExisError} = require('../constants/err.type')


const auth = async (ctx,next)=>{
  try {
    const {authorization} = ctx.request.header;
    const token = authorization.replace('Bearer ','');
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
    await next();
  } catch (error) {
    const errorMap = {
      TokenExpiredError: tokenExpiredError,
      JsonWebTokenError: jsonWebTokenError,
      NotBeforeError: notBeforeError,
      default: tokenNonExisError,
    };
    const chosenError = errorMap[error.name] || errorMap.default;
    ctx.app.emit('error', chosenError, ctx);
  }
}

const tokenGenerator = async () => {

}

module.exports = {
  auth
}