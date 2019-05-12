const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();




router.get('/:cate',async (ctx,next)=>{
    let {cate} = ctx.params;
    // console.log(cate)
    let {id} = ctx.query;
    console.log(ctx.query)
    switch(cate)
    {
        case 'all':
            var res = await db.find('chunqiu');
            break;
        default:
            var res = await db.find('chunqiu',{id});
            
    }
    
    // console.log(ctx.query,res)

    // if(res.length>0){
    //     ctx.body = 'no'
    // }else{
        ctx.body = res
    // }
})

module.exports = router;