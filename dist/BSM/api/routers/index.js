const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');


// 创建路由
var router = new Router(); 

// 引入页面路由
const orderFormRouter = require('./orderForm');
const listitemRouter = require('./listitem');
const listEditRouter = require('./listEdit');
const goodslistRouter = require('./goodslist');
const goodsAddRouter = require('./goodsAdd');
const uploadRouter = require('./upload');
const loginRouter = require('./login');
const userlistRouter = require('./userlist_login');


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
            // console.log(filename)
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            file.path = './uploads/'+file.name
        }
    }
}));

router.use('/orderForm',orderFormRouter.routes())
router.use('/listitem',listitemRouter.routes())
router.use('/listEdit',listEditRouter.routes())
router.use('/goodslist',goodslistRouter.routes())
router.use('/goodsAdd',goodsAddRouter.routes())
router.use('/upload',uploadRouter.routes())
router.use('/login', loginRouter.routes())
router.use('/userlist_login', userlistRouter.routes())

module.exports = router;