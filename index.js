const koa = require('koa');
const kbr = require('koa-better-router');
const uuidv1 = require('uuid/v1');
const kbb = require('koa-better-body');
const calcDistanceMatrix = require('./calcDistanceMatrix');

const server = new koa();
const tokens = {};
const router = kbr({ prefix: '/route' }).loadMethods();

router.post('/', kbb(), (ctx, next) => {
  const token = uuidv1();
  tokens[token] = { status: 'in progress' };
  const res = calcDistanceMatrix(ctx.request.fields);
  res.on('success', data => tokens[token] = data);
  res.on('error', error => tokens[token] = error);
  ctx.status = 201;
  ctx.body = { token };
  return next();
});

router.get('/:token', (ctx, next) => {
  if (!tokens[ctx.params.token]) {
    ctx.status = 422;
    ctx.body = { error: 'Invalid token' };
  } else {
    ctx.status = 200;
    ctx.body = tokens[ctx.params.token]
  }
  return next();
});
server.use(router.middleware());
server.listen(9000);
console.log('Web server started at 127.0.0.1:9000');