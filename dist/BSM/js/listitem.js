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
            let xhr = new XMLHttpRequest();
          xhr.onload = function(){
            console.log(xhr.responseText);
          }
          xhr.open("post","/listitem");
          xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          xhr.send(`id=${data.id}`);
          });
        } else if(obj.event === 'edit'){
          location.href = `listEdit.html?id=${data.id}`;
          // layer.alert('编辑行：<br>'+ JSON.stringify(data))
        }
      });
      table.render({
        elem: '.layui-table'
        ,id : 'idTest'
        ,url: '/listitem'
        ,cols: [[
          {checkbox: true, fixed: "left"}
          ,{field:'id', title: 'ID', width:170,  fixed: true}
          ,{field:'type', title: '商品分类', width:400}
          ,{field:'joinTime', title: '添加时间',  width:240}
          ,{fixed:"right",align:"center",width:217,toolbar:"#barDemo"}
        ]]
        ,page: true
        ,height: 466
        ,width : 1091
    });
      var $ = layui.$, active = {
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
    let layuiAdd = document.getElementsByClassName("layui-btn-warm")[0];
    layuiAdd.onclick = function(){
      location.href = "listEdit.html";
    }
 })()