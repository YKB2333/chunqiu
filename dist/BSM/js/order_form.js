(()=>{
  layui.use('element', function(){
      var element = layui.element;
      //监听导航点击
      element.on('nav(filter)', function(elem){
      console.log(elem); //得到当前点击的DOM对象
      });
    });
  layui.use('table', function(){
    var table = layui.table;
    //监听单元格编辑
    table.on('edit(demo)', function(obj){
      var value = obj.value //得到修改后的值
      ,data = obj.data //得到所在行所有键值
      ,field = obj.field; //得到字段
      layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
      let xhr = new XMLHttpRequest();
      xhr.onload = function(){
        console.log(xhr.responseText);
      }
      xhr.open("put",`/orderForm?id=${data.id}&${field}=${value}`);
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.send(null);
    });
    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
    console.log(obj)
    });
    //监听工具条
    table.on('tool(demo)', function(obj){
      console.log(666)
      var data = obj.data;
      if(obj.event === 'detail'){
        layer.msg('ID：'+ data.id + ' 的查看操作');
      } else if(obj.event === 'del'){
        // layer.msg('ID：'+ data.id + ' 的查看操作');
        layer.confirm('真的删除行么', function(index){
          
          obj.del();
          layer.close(index);
          let xhr = new XMLHttpRequest();
          xhr.onload = function(){
            console.log(xhr.responseText);
          }
          xhr.open("post","/orderForm");
          xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          xhr.send(`id=${data.id}`);
        });
      } else if(obj.event === 'edit'){
        layer.alert('编辑行：<br>'+ JSON.stringify(data))
      } 
    });
    table.render({
      elem: '.layui-table'
      ,url: '/orderForm/all'
      ,cols: [[
        {checkbox: true, fixed: true}
        ,{field:'id', title: 'ID', width:80, sort: true, fixed: true}
        ,{field:'name', title: '商品名称', width:120}
        ,{field:'price', title: '价格', width:80, sort: true}
        ,{field:'num', title: '数量',  width:80}
        ,{field:'carriage', title: '运费',  width:80}
        ,{field:'allPri', title: '商品总额', sort: true, width:120}
        ,{field:'carPri', title: '订单总额', sort: true,width:120}
        ,{field:'joinTime', title: '下单时间',  width:115}
        ,{field:'status_pay', title: '状态', edit:"text", width:105}
        ,{field:'status_send', title: '状态', edit:"text", width:105}
        ,{field:'status_sign', title: '状态', edit:"text", width:105}
        ,{fixed:"right",align:"center",title:"操作",toolbar:"#barDemo"}
      ]]
      ,id: 'demo'
      ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        layout: [ 'prev', 'page', 'next', 'skip'] //自定义分页布局
        //,curr: 5 //设定初始在第 5 页
        ,groups: 1 //只显示 1 个连续页码
        ,first: false //不显示首页
        ,last: false //不显示尾页
        ,limit : 10      
      }
      ,height: 500
      ,width : 1251
  });
    
    
    // table.render({
    // elem: '.layui-table'});
    var $ = layui.$, active = {
      reload: function(){
        var demoReload = $('#demoReload');
        //执行重载
        // table.reload('idTest', {
        //   url: '/api/table/search'
        //   ,where: {} //设定异步数据接口的额外参数
        //   //,height: 300
        // });
        table.reload('demo', {
          url: '/orderForm/term'
          ,
          page: {
            curr: 1 //重新从第 1 页开始
          }
          ,where: {
              id: demoReload.val()
          }
        });
      },
      getCheckData: function(){ //获取选中数据
        var checkStatus = table.checkStatus('idTest')
        ,data = checkStatus.data;
        layer.alert(JSON.stringify(data));
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
    
})()