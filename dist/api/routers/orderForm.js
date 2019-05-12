const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();


router.get('/',async (ctx,next)=>{
    let {page} = ctx.query;
    page=page*5
    let res2 = await db.find3('orderForm',{},page,5);
    ctx.body = res2;
    
})

router.post("/",async (ctx,next)=>{
    let {id}=ctx.request.body;
    id = id*1;
    let res2 = await db.delete('orderForm',{id});
    console.log(res2)
    ctx.body={
        code:1,
        msg:"成功",
        data : res2
    }
})

module.exports = router;