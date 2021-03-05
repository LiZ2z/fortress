const Router = require('@koa/router');
const IconsController = require('./controller/Icons');

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World!';
});

const iconsControl = new IconsController();

router.get('/icon/getList', iconsControl.getIcons);
router.post('/icon/update', iconsControl.updateIcon);

module.exports = router;
