const Router = require('koa-router');
const koaBody = require('koa-body');

const db = require('../db');

// 创建路由
var router = new Router();

router.put('/',async (ctx,next)=>{
    console.log(ctx.query);
    let {file,id,name,price,now_price,total,description,type,time}=ctx.query;
    let realPath = "../uploads/"+file;
    // console.log(realPath)
    if(id){
        id=id*1;
        let res1 = await db.find('goodslist',{id});
        var {imgurl} = res1[0];
        imgurl.push(realPath);
        // console.log(imgurl)
        let res2 = await db.update('goodslist',{id},{$set:{imgurl,name,price,now_price,total,description,type,time}});
        // res = res;
        ctx.body = res2;
    }
    else{
        var d = new Date(); 
        d=d.getTime().toFixed(0);
        var imgurl = [];
        imgurl.push(realPath)
        let res2 = await db.insert('goodslist',{id:d,imgurl,name,price,now_price,total,description,type,time,state});
        ctx.body = res2;
    }

})
router.post('/',(ctx,next)=>{
    ctx.body = {};
})
module.exports = router;