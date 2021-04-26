const path = require("path");
const Koa = require("koa");
const koaStatic = require("koa-static");
const KoaRouter = require("koa-router");
const logger = require("koa-logger");
// const getPort = require('get-port');
const data = require("../static/channels.json");

const app = new Koa();
const router = new KoaRouter();
const port = 3000;

async function runServer() {
  // const port = await getPort({ port: 3000 });
  router.get("/channels", (ctx) => (ctx.body = data));

  app.use(logger());
  app.use(koaStatic(path.join(__dirname, "..", "static")));
  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);

const server = app.listen(port);
module.exports = server;
