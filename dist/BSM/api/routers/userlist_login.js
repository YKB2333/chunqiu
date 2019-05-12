const Router = require('koa-router');

const db = require('../db');
//创建路由
var router = new Router();


//页面渲染
router.get('/:cate', async (ctx, next) => {
    //结构
    let { cate } = ctx.params;
    switch (cate) {
        case "xuanran":
            let res = await db.find('user', { oa: 0 });
            if (res) {
                //把查询到的权限为普通用户的信息返回前端
                ctx.body = {
                    "code": 0,
                    "msg": "",
                    "data": res
                }
            } else {
                ctx.body = {
                    code: 100,
                    msg: 'fail'
                }
            }
        break;
        case "dels":
           //$or 多个条件匹配   data 里的就是你传来的数据
            var {username} = ctx.query;
            let data = [];
            username = JSON.parse(username)

            for (var i = 0; i < username.length; i++) {
                let obj = {};
                obj.username = username[i]
                data.push(obj)
            }
            console.log(data);
            let reg = await db.delete('user',{'$or':data});
            ctx.body = null;
            break;
            // let res = await db.delete('goodslist', { '$or': data })
        case "tianjia":
            var { username, sex, address, signature, profession, grade, regdata, oa, password } = ctx.query;
            
            //转换数据
            oa = oa * 1;
            let aer =await db.insert('user', { username, sex, address, signature, profession, grade, regdata, oa, password})
            ctx.body = oa;
        break;
        case "bianji":
            var { username } = ctx.query;
            let aee = await db.find('user', {username})
            ctx.body = aee;
            break; 
        case "gengai":
            // var shu = [];
            // arr = JSON.parse(arr)
            
            var { username, sex, address, signature, profession, grade, regdata, oa, password,oldname} = ctx.query;

            
            let ccc = await db.update('user', { username: oldname }, { $set: { username, sex, address, signature, profession, grade, regdata, oa, password}});
            ctx.body = ccc;
            break; 
        case "chu":
           
            var { username} = ctx.query;


            let chu = await db.find('user', { username });
            ctx.body = chu;
            break; 

    }


    // 解构
    // let {oa} = ctx.request.body;
    //转换
    // oa = oa*1;
    //查询
   
})

//删除功能
router.post('/', async (ctx, next) => {

    // 解构
    //get传来的位置就在query 而post发送过来的在request下body
    let {username} = ctx.request.body;
    //查询删除
    // console.log(username);
    let res = await db.delete('user',{username});
        ctx.body =res;
})
module.exports = router;

