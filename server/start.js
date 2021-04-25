const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const KoaRouter = require('koa-router');
const getPort = require('get-port');
const data = require('../static/channels.json');

async function runServer() {
    const port = await getPort({ port: 3000 });
    const app = new Koa();
    const router = new KoaRouter();
    
    app.use(koaStatic(path.join(__dirname, '..', 'static')));
    app.use(router.routes()).use(router.allowedMethods());
    
    router.get('/channels', ctx => ctx.body = data);

    app.listen(port);

    console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);
