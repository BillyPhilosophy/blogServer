const Koa = require('koa');
const {APP_PORT} = require('./config/config.default');

const app = new Koa();
const userRoute = require('./router/users.route');

console.log(APP_PORT);
app.use(userRoute.routes());
// response
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.listen(APP_PORT,()=>{
    console.log(`Server is Runing on http://localhost:${ APP_PORT }`)
});