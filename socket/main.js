const Koa = require('koa');
const Pug = require('koa-pug');
const path = require('path');
const websockify = require('koa-websocket');
const route = require('koa-route');
const serve = require('koa-static');
const mount = require('koa-mount');

const app = websockify(new Koa());

new Pug({
    viewPath: path.resolve(__dirname, './views'),
    app,
});
app.use(mount('/src', serve('socket/src')));

app.use(async (ctx) => {
    await ctx.render('main');
});

// Using routes
app.ws.use(
    route.all('/test/:id', function (ctx) {
        ctx.websocket.send('Hello World');
        ctx.websocket.on('message', function (message) {
            console.log(message);
        });
    })
);

app.listen(3000);
