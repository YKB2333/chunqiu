const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    // 解构
    let { username, password, mdl } = ctx.request.body;
    //
    password = password*1;//把得到的密码装换成整型
    let res = await db.find('user', { username, password}); 

    res = res[0];//res就是你查询得到用户的所有信息

    if (res) {
        ctx.body = {
            //把用户名，与权限值返回主页
            username: res.username,
            oa:res.oa
        }
        // console.log(res);
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }

})

module.exports = router;