const Koa = require('koa');
const app = new Koa();
const userRoute = require('../router/users.route');

app.use(userRoute.routes());
module.exports = app;