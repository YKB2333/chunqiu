const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

// (async ()=>{
//     let res = await db.find("orderForm",{});
//     console.log(res)
// })()
/**
 * ctx
 */
router.get('/',async (ctx,next)=>{
    // 解构
    // let {username,password,mdl} = ctx.request.body;
    let {page,limit}=ctx.query;
    let all = (page-1)*limit;
    limit=limit*1;
    let res1 = await db.find('classifiedItemForm');
    let res2 = await db.find2('classifiedItemForm',{},all,limit);

    // res = res;
    ctx.body={
        "code": 0,
        "msg": "",
        "count": res1.length,
        "data": res2
    }
    // if(res){
    //     ctx.body = {
    //         _id:res._id,
    //         username:res.username,
    //         gender:res.gender,
    //         regtime:res.regtime
    //     }
    // }else{
    //     ctx.body = {
    //         code:100,
    //         msg:'fail'
    //     }
    // }

    

    // 存入数据库
})
router.post('/',async (ctx,next)=>{
    // 解构
    let {id} = ctx.request.body;
    id=id*1;
    let res = await db.delete('classifiedItemForm',{id});
    // res = res;
    ctx.body=res;
    // if(res){
    //     ctx.body = {
    //         _id:res._id,
    //         username:res.username,
    //         gender:res.gender,
    //         regtime:res.regtime
    //     }
    // }else{
    //     ctx.body = {
    //         code:100,
    //         msg:'fail'
    //     }
    // }

    // 存入数据库
})

module.exports = router;