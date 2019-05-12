const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();


/**
 * ctx
 */
router.get('/:attribute',async (ctx,next)=>{
    let {attribute}=ctx.params;
    let {attributeId} = ctx.query;
    if(attribute=="all"){
        var res2 = await db.find("list",{attributeName:attributeId});
            // console.log(res)
            ctx.body = {
            "code": 0,
            "msg": "",
            "data":res2
            };
    }else if(attribute=="key"){
        var res2 = await db.find2("list",{name:{$regex:attributeId}});
        // console.log(res)
        ctx.body = {
        "code": 0,
        "msg": "",
        "data":res2
        };
    }else{
        attribute=attribute*1;
         var res2 = await db.find("list",{attribute});
        // console.log(res)
        ctx.body = {
        "code": 0,
        "msg": "",
        "data":res2
        };
    }
    
})

module.exports = router;