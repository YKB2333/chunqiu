$(function () {

    layui.use('table', function () {
        var table = layui.table;


        //监听表格复选框选择
        table.on('checkbox(demo)', function (obj) {
            // console.log(obj.data);
            //能打印每条被选中的数据
        });


        //监听工具条
        table.on('tool(demo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.username + ' 的查看操作');


            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    layer.close(index);
                    // 发送ajax请求
                    //删除功能
                    var xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (xhr.status == 200) {
                            let fanhui = JSON.parse(xhr.responseText);
                            console.log(fanhui);
                            location.reload();//刷新页面
                        }
                    }
                    xhr.open('post', '/userlist_login', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    var datas = 'username=' + data.username;
                    xhr.send(datas);


                });
                //编辑用户信息
            } else if (obj.event === 'edit') {
                // layer.alert('编辑行：<br>' + JSON.stringify(data))
                window.open("../html/useradd_bianji.html?username="+data.username);

            }
        });

        //页面渲染，自动layui自带js代码生成表格
        table.render({
            elem: '.layui-table'
            , width: 1000,
            height: 332,
            url: '/userlist_login/xuanran',
            id: 'idTest',
            cols: [[
                { type: 'checkbox', width: 80, }
                , { field: 'username', width: 80, title: '用户名' }
                , { field: 'sex', width: 80, title: '性别', sort: true }
                , { field: 'address', width: 80, title: '城市' }
                , { field: 'signature', title: '签名', width: 150, }
                , { field: 'profession', width: 80, title: '职业' }
                , { field: 'grade', width: 80, title: '评分', sort: true }
                , { field: 'regdata', title: '注册日期', minwidth: 100 }
                , { fixed: "right", align: "center", width: 120, toolbar: "#barDemo" }
            ]]
            , page: true
        });


        //**点击删除获取到所有被选中的用户名
        var $ = layui.$, active = {
            getCheckData: function () { //获取选中数据
                var checkStatus = table.checkStatus('idTest')
                    , data = checkStatus.data;
                var aaa = confirm('你确定要删除所选内容么');
                if(aaa){
                    // layer.alert(JSON.stringify(data));
                    var a = [];
                    for (var i = 0; i < data.length; i++) {
                        a.push(data[i].username);
                    }
                    var arr = JSON.stringify(a);
                    // console.log(a);
                    //删除多个

                    var xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (xhr.status == 200) {
                            location.reload();//刷新页面
                        }
                    }
                    xhr.open('get', '/userlist_login/dels?username=' + arr, true);

                    xhr.send(null);
                }
                
            }
        };

        $('.layui-btn-group .layui-btn').on('click', function () {

            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //点击条转添加页面
        $('#tian').on('click',function(){
            window.location.href = "../html/userAdd.html";
        });


        //展示已知数据
        table.render({
            elem: '#demo'
            , width: 1221
            , url: '/user' //数据接口
            , parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.count, //解析数据长度
                    "data": res.data //解析数据列表
                };
            }
            , request: {
                pageName: 'page'
                , limitName: 'qty'
            }
            , page: true //开启分页
            , qty: 10
            , cols: [[ //标题栏
                { type: 'checkbox' }
                , { field: '_id', title: 'ID', width: 250, sort: true }
                , { field: 'phone', title: '手机号', width: 120 }
                , { field: 'nickname', title: '昵称', width: 80 }
                , { field: 'gender', title: '性别', width: 60 }
                , { field: 'birthday', title: '生日', width: 120 }
                , { field: 'email', title: '邮箱', width: 180 }
                , { field: 'remark', title: '描述', width: 130 }
                , { field: 'regtime', title: '注册时间', width: 100 }
                , { fixed: 'right', title: '操作', toolbar: '#barDemo', width: 120 }
            ]]
            , even: true
        });

    });



});