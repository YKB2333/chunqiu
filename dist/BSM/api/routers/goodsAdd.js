const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();



router.get('/:cate',async (ctx,next)=>{
    let {cate} = ctx.params;
    switch(cate){
        case "find":
            // 解构
            var {id} = ctx.query;
            id=id*1;
            let res = await db.find('goodslist',{id});
            // res = res;
            ctx.body = res;
            break;
        // case "update":
        //     // 解构
        //     var {type,description,id,joinTime}=ctx.query;
        //     id=id*1;
        //     let res1 = await db.update('classifiedItemForm',{id},{$set:{description,type,joinTime}});
        //     // res = res;
        //     ctx.body = res1;
        //     break;
        // case "insert":
        //     var {type,description,joinTime}=ctx.query;
        //     let res3 = await db.find('classifiedItemForm');
        //     let res2 = await db.insert('classifiedItemForm',{id:(10000+res3.length),type,description,joinTime});
        //     // res = res;
        //     ctx.body = res2;
        //     break;
    }
    
})

module.exports = router;