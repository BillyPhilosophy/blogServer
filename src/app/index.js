const Koa = require('koa');
const Router = require('koa-router');
const swaggerUI = require('koa2-swagger-ui').koaSwagger;
const swaggerSpec = require('../../swagger');
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();


const userRoute = require('../router/users.route');
router.use(userRoute.routes(), userRoute.allowedMethods());
// swagger UI的服务
router.get(
  '/swagger',
  swaggerUI({
      routePrefix: false,
      swaggerOptions: {
          spec: swaggerSpec,
      },
  })
);
console.log(JSON.stringify(swaggerSpec, null, 2));

const errHandler = require('./errHandler')

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());
// app.use(userRoute.routes());

app.on('error',errHandler)
module.exports = app;