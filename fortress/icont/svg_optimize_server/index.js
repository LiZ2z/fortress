const Koa = require('koa');
const router = require('./routes');
const useCORS = require('./middleware/useCORS');
const useBodyParser = require('./middleware/useBodyParser');
const useResponse = require('./middleware/useResponse');

const app = new Koa();

app
  .use(useCORS())
  .use(useBodyParser())
  .use(useResponse())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log('svg optimize server runing');
});
