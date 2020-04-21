import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

import graphqlHttp from 'koa-graphql';

import Router from '@koa/router';
import logger from 'koa-logger';

import koaPlayground from 'graphql-playground-middleware-koa';

import { schema } from './schema'

const app = new Koa<any, Context>();

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}

const router = new Router<any, Context>();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app.use(bodyParser());

const graphqlServer = graphqlHttp({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
})

router.get('/', (ctx: Context) => {
  ctx.body = 'Hello';
});

router.all(
  '/graphql',
  graphqlServer
);

app.use(router.routes()).use(router.allowedMethods());
app.use(cors());

export default app;
