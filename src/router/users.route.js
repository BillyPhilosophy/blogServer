const Route = require('koa-router');

const userRoute = new Route({prefix:'/users'});

userRoute.get('/', (ctx, next) => {
    // ctx.router available
    ctx.body = 'api users'
});

module.exports = userRoute;