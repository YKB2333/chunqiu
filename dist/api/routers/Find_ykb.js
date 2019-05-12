const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.get('/:condition',async (ctx,next)=>{
    // 解构
    let {condition} = ctx.params;
    let res;
    switch(condition){
        case "new":
            res = await db.find('find',{});
            break;
        case "superman":
            res = await db.find('find',{"detail.articleType":"达人游记"});
            break;
        case "official":
            res = await db.find('find',{"detail.articleType":"官方推荐"});
            break;
        default :
            res = await db.find('find',{"dests.destName":condition});
        break;
    }
    ctx.body=res;
})

router.post("/",async (ctx,next)=>{
    let {id} = ctx.request.body;
    let res = await db.find('find',{"detail.id":id});
    if(res.length>0){
        ctx.body={
                code:1,
                msg:"success",
                res
            };
    }else{
        ctx.body={
            code:0,
            msg:"false",
            res
        };
    }
    
})
module.exports = router;