import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

import Router from '@koa/router';
import logger from 'koa-logger';

const app = new Koa<any, Context>();

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}

const router = new Router<any, Context>();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app.use(bodyParser());

router.get('/', (ctx: Context) => {
  ctx.body = 'Hello';
});

app.use(router.routes()).use(router.allowedMethods());
app.use(cors());

export default app;
