$(function(){

  //layui模板自带
  layui.use(['form', 'layedit','laydate'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,layedit = layui.layedit
    ,laydate = layui.laydate;
    
    //日期
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });
    
    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');
   
    //自定义验证规则  用户名，昵称
    form.verify({
      title: function(value){
        if(value.length < 2){
          return '标题至少得2个字符啊';
        }
      }
      //密码长度验证
      ,pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ]
      ,content: function(value){
        layedit.sync(editIndex);
      }
    });

    //监听提交
    form.on('submit(demo1)', function(data){
     
      let username = $('.username').val();
      let sex = $('.sex').val();
      let address = $('.address').val();
      let signature = $('.signature').val();
      let profession = $('.profession').val();
      let grade = $('.grade').val();
      let regdata = $('.regdata').val();
      let oa = 0 *1;
      let password = $('.password').val();
      let password2 = $('.password2').val();
      //发送ajax请求
     console.log(oa);
      if(password == password2){
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
          if (xhr.status == 200) {

            alert('添加成功');
            // location.reload();//刷新页面
          }
        }
        xhr.open('get', `/userlist_login/tianjia?username=${username}&sex=${sex}&address=${address}&signature=${signature}&profession=${profession}&grade=${grade}&regdata=${regdata}&oa=${oa}&password=${password}`, true);
        xhr.send(null);
      }else{
        alert('请检查密码是否一致')
      }


    });


    //发送ajax请求
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = () => {
  //     if (xhr.status == 200) {
  //       // location.reload();//刷新页面
  //       alert('修改成功');
  //     }
  //   }
  //   xhr.open('get', '/userlist_login/bianji?username=' + title, true);

  //   xhr.send(null);
  });
});
