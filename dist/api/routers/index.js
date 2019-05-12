const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router(); 

// 引入页面路由
const orderFormRouter = require('./orderForm');
const Find_ykbRouter = require('./Find_ykb');
const registryRouter = require('./registry');
const goodslistRouter = require('./goodslist');
const loginRouter = require('./login');
const ListRouter = require('./List');
const userlist_loginRouter = require('./userlist_login');

router.use(koaBody({
    // 支持formdata
    multipart:true,

    // 文件支持
    formidable:{
        // 指定保存路径
        uploadDir:'./uploads',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));
router.use('/userlist_login', userlist_loginRouter.routes())
router.use('/orderForm',orderFormRouter.routes())
router.use('/find',Find_ykbRouter.routes())
router.use('/login',loginRouter.routes())
router.use('/registry',registryRouter.routes())
router.use('/goodslist',goodslistRouter.routes())
router.use('/list',ListRouter.routes())

module.exports = router;