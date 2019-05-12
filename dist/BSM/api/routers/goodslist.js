const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.get('/:cate',async (ctx,next)=>{
    let {cate} = ctx.params;
    switch(cate){
        case "all":
            // console.log(ctx.query);//{page:'1',limit:'10'}
            var {page,limit} = ctx.query;
            var num = (page-1)*limit;
            // console.log(num,limit)
            var res = await db.find2('goodslist',null,num,limit*1);
            var res2 = await db.find('goodslist');
            // console.log(res)
            ctx.body = {
            "code": 0,
            "msg": "",
            "count": res2.length,
            "data":res
            };
            break;
        case "filter":
            var {page,limit,name} = ctx.query;
            var num = (page-1)*limit;
            var res = await db.find2('goodslist',{name:{$regex:name}},num,limit*1);
            // let res2 = await db.find('goodslist');
            // console.log(res)
            ctx.body = {
            "code": 0,
            "msg": "",
            "count": res.length,
            "data":res
            };
            break;
    }
    
    // 存入数据库
})

router.post('/',async(ctx,next)=>{
    // console.log(ctx.request.body)
    let {id} = ctx.request.body;
    // console.log(id*1)
    id = id*1;
    let res = await db.delete('goodslist',{id})
    ctx.body = null;
})
router.put('/',async(ctx,next)=>{
    // console.log(ctx.request.body)
    let {num} = ctx.request.body;
    let data = [];
    num = JSON.parse(num)

      for(var i=0;i<num.length;i++){
            let obj = {};
            obj.id = num[i]
            data.push(obj)
        }
      
    let res = await db.delete('goodslist',{'$or':data});
    ctx.body = null;
})
module.exports = router;