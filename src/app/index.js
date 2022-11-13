const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const userRoute = require('../router/users.route');

const errHandler = require('./errHandler')

app.use(koaBody());
app.use(userRoute.routes());

app.on('error',errHandler)
module.exports = app;