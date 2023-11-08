const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')

const {tokenExpiredError,jsonWebTokenError,notBeforeError} = require('../constants/err.type')


const auth = async (ctx,next)=>{
  const {authorization} = ctx.request.header;
  const token = authorization.replace('Bearer ','');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (error) {
    switch(error.name){
      case 'TokenExpiredError':
        return ctx.app.emit('error',tokenExpiredError,ctx);
      case 'JsonWebTokenError':
        return ctx.app.emit('error',jsonWebTokenError,ctx);  
      case 'NotBeforeError':
        return ctx.app.emit('error',notBeforeError,ctx);  
    }
  }
  await next()
}

module.exports = {
  auth
}