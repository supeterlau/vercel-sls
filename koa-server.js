const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

app.use(async ctx => {
  ctx.body = {
    data: [
      'Erlang',
      'Elixir',
      'Ruby',
      'Rust'
    ]
  };
});

app.listen(3000);