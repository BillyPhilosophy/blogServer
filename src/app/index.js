const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const userRoute = require('../router/users.route');

app.use(koaBody());
app.use(userRoute.routes());
module.exports = app;