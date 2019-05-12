const Koa = require('koa');
const static = require('koa-static');

// ·��

const routers = require('./api/routers');


// ����koaӦ��
const app = new Koa();//app.context



// ������̬��Դ����
app.use(static('./'));
// ����statusΪ404��nullʱ������response��Ϣ
app.use(routers.allowedMethods());
app.use(routers.routes());

// �����˿�

app.listen(1811,()=>{

    console.log('server is running on http://localhost:1811');
})