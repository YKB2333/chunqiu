const Router = require('koa-router');

const db = require('../db');
//创建路由
var router = new Router();


//页面渲染
router.get('/', async (ctx, next) => {
    //结构
    let { id } = ctx.query;
    id = id *1;
    let res = await db.find('chunqiu_home',{id});
    if (res) {
        //把查询到的权限为普通用户的信息返回前端
        ctx.body = res
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
 
})


module.exports = router;

