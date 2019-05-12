$(document).ready(function(){
    let query = location.search.slice(1);
    let user = $("input[name='username']")[0];
    let pri = $("input[name='price']")[0];
    let nowPri = $("input[name='now_price']")[0];
    let total = $("input[name='total']")[0];
    let selectTitle;
    let text = $(".layui-input-block>textarea")[0];
    let data ;
    let realFile = {};
    //JavaScript代码区域
    layui.use(['element','upload','form'], function(){
      var element = layui.element;
      var upload = layui.upload;
      var form = layui.form
      var $ = layui.jquery
      ,upload = layui.upload;
        // 多图片上传
        upload.render({
            elem: '#test2'
            ,url: '/upload'
            // ,auto: false
            // ,bindAction: '#btnConfirm'
            ,multiple: false
            ,before: function(obj){
              //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    realFile=file;
                    $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img" style="border:1px solid #ccc;margin-right:10px;">')
                    
                });
            }
            ,done: function(res){
              
            }
        })
    });
    

    // console.log(interest.innerHTML)
    if(query){
        var xhr = new XMLHttpRequest();
        xhr.onload =  function(){
            var res = JSON.parse(xhr.responseText)[0];
            user.value = res.name;
            pri.value = res.price;
            nowPri.value = res.now_price;
            total.value = res.total;
            selectTitle = $(".layui-select-title>input")[0];
            selectTitle.value=res.type;
            text.value = res.description;
            console.log(res.imgurl)
            res.imgurl.map((item)=>{
                $('#demo2').append('<img src="'+ item +'" alt="" class="layui-upload-img" style="border:1px solid #ccc;margin-right:10px;">')
            })
            // interest.html(res.now_price)
            // interest.value = res.type;
            // layuiInput.value = res.type;
            // text.value = res.description;
        }
        xhr.open("get","/goodsAdd/find?"+query);
        xhr.send(null);
    }

    //确认按钮
    btnConfirm.onclick=function(){
        var time = new Date();
        time= time.toLocaleDateString();
        // username=狼牙棒&price=998&now_price=599&interest=&file=&total=10000&desc=可供想象的大棒
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            console.log(xhr.responseText)
        }
        try{
            data = `name=${user.value}&price=${pri.value}&now_price=${nowPri.value}&file=${realFile.name}&total=${total.value}&description=${text.value}&${query}&type=${selectTitle.value}&time=${time}`;
        }catch{
            let _layui = document.getElementsByClassName("layui-this")[0];
            data = `name=${user.value}&price=${pri.value}&now_price=${nowPri.value}&file=${realFile.name}&total=${total.value}&description=${text.value}&${query}&type=${_layui.innerHTML}&time=${time}&state=1`;  
        }
        
        xhr.open("put",`/upload?${data}`)
        xhr.send(null);
        location.href="goodslist.html"
    }
});