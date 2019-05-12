(()=>{
    layui.use('element', function(){
        var element = layui.element;
    }); 
    let query = location.search.slice(1);
    let layuiInput = document.getElementsByClassName("layui-input")[0];
    let text = document.getElementsByTagName("textarea")[0];
    let btn = document.getElementsByClassName("layui-btn-normal")[0];

    if(query){
        console.log(666)
        var xhr = new XMLHttpRequest();
        xhr.onload =  function(){
            var res = JSON.parse(xhr.responseText);
            
             layuiInput.value = res[0].type;
             text.value = res[0].description;
        }
        xhr.open("get","/listEdit/find?"+query);
        xhr.send(null);
        btn.onclick = function(){
            var d = new Date();
            let _layui = layuiInput.value;
            let _text = text.value;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                let {ok}=JSON.parse(xhr.responseText)
                if(ok==1){
                    location.href = "listitem.html";
                }
            }
            xhr.open("get",`/listEdit/update?type=${_layui}&description=${_text}&joinTime=${d.toLocaleDateString()}&id=${query}`);
            xhr.send(null);
         }
    }else{
        btn.onclick = function(){
            var d = new Date();
            let _layui = layuiInput.value;
            let _text = text.value;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                let {ok}=JSON.parse(xhr.responseText)
                if(ok==1){
                    location.href = "listitem.html";
                }
            }
            xhr.open("get",`/listEdit/insert?type=${_layui}&description=${_text}&joinTime=${d.toLocaleDateString()}`);
            xhr.send(null);
         }
    }
   
    
    
    
})()