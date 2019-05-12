(()=>{
	//JavaScript代码区域
  layui.use(['element','table'], function(){
    var element = layui.element;
    var table = layui.table;
    
    
    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
      console.log(obj)
    });
    //监听工具条
    table.on('tool(demo)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
          layer.msg('ID：'+ data.id + ' 的查看操作');
        } else if(obj.event === 'del'){
          layer.confirm('真的删除行么', function(index){
            obj.del();
            layer.close(index);
            $.ajax({
              type:"post",
              url: "/goodslist",
              data: 'id='+ data.id,
              success: function(str){
                console.log(str);
              }
            })
          });
        } else if(obj.event === 'edit'){
          // console.log(data.id)
          location.href = `goodsAdd.html?id=${data.id}`;
          // layer.alert('编辑行：<br>'+ JSON.stringify(data))
        }
      });
    // //表格模块
    table.render({
      elem: '.layui-table'
      ,height: '400px'
      ,url:'/goodslist/all'
      ,count: 100
      ,limit: 10
      ,limits: [10, 20, 30, 40, 50]
      ,cols: [[
        {type:'checkbox'}
        ,{field:'id', width:138, height:55, title: 'ID', sort: true}
        ,{field:'name', width:200, height:55, title: '商品名称'}
        ,{field:'type', width:80, height:55, title: '分类', sort: true}
        ,{field:'price', width:120, height:55, title: '价格(原价)',sort: true}
        ,{field:'now_price', width:120, height:55, title: '价格(现价)',sort: true}
        ,{field:'total', width:80, height:55, title: '库存', minWidth: 100,sort: true}
        ,{field:'state', width:80, height:55, title: '状态', sort: true}
        ,{field:'time', width:100, height:55, title: '添加时间', sort: true}
        ,{field:'classify', height:55, title: '操作',toolbar: '#barDemo'}
      ]]
      ,id: 'idTest'
      ,page: true
    });
    var $ = layui.$, active = {
      reload: function(){
        var demoReload = $('#demoReload');
        //执行重载
        // table.reload('idTest', {
        //   url: '/api/table/search'
        //   ,where: {} //设定异步数据接口的额外参数
        //   //,height: 300
        // });
        table.reload('idTest', {
          url: '/goodslist/filter'
          ,
          page: {
            curr: 1 //重新从第 1 页开始
          }
          ,where: {
              name: demoReload.val()
          }
        });
      },
      getCheckData: function(){ //获取选中数据
        var checkStatus = table.checkStatus('idTest')
        ,data = checkStatus.data;
        // layer.alert(JSON.stringify(data));
        let content = null;
        if(data.length == 0){
          content = '您还没有选择行';
        }else{
          content = '真的删除行么'
        }
        layer.confirm(content, function(index){
          layer.close(index);
          //删除多条数据
          let num = [];
          for(var i=0;i<data.length;i++){
              num.push(data[i].id)
          }
          // console.log(num);
          $.ajax({
            type: "put",
            url: '/goodslist',
            data: 'num='+JSON.stringify(num),
            success:function(str){
            }
          })
              location.reload();//刷新页面

        })
      }
      ,getCheckLength: function(){ //获取选中数目
        var checkStatus = table.checkStatus('idTest')
        ,data = checkStatus.data;
        layer.msg('选中了：'+ data.length + ' 个');
      }
      ,isAll: function(){ //验证是否全选
        var checkStatus = table.checkStatus('idTest');
        layer.msg(checkStatus.isAll ? '全选': '未全选')
      }
    };
      
    $('.demoTable .layui-btn').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  });

  //搜索
  var search = document.querySelector(".search");
  var d = new Date();
  // search.oninput = function(){
  //   var d2 = new Date();
  //   if((d2-d)>500){
  //     var name = search.value;
  //     var xhr = new XMLHttpRequest();
  //     xhr.onload = function(){
  //       console.log(xhr.responseText)
  //     }
  //     xhr.open("get","/goodslist/filter?name="+name);
  //     xhr.send()
  //   }
  //   d=d2;
  // }
})()
