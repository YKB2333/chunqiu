var cookie = {
    set: function (name, value, prop) {
        //name和value是必写参数。prop是json格式的数据
        var str = name + '=' + value; //必写的

        //prop
        //expires:设置失效时间
        if (prop.expires) {
            str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
        }
        //prop.path :设置路径
        if (prop.path) {
            str += ';path=' + prop.path;
        }
        //设置访问权限domain
        if (prop.domain) {
            str += ';domain=' + prop.domain;
        }

        //设置：存
        document.cookie = str;

    },
    get: function (key) {
        //获取
        var str = document.cookie; //name=jingjing; psw=123456
        var arr = str.split('; '); //[name=jingjing , psw=123456]
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //[name,jingjing] [psw,123456]
            if (key == arr2[0]) {
                return arr2[1]; //通过键名取键值
            }
        }
    },
    remove: function (key) {
        //cookie:设置时间失效，设置时间为过去的某个时间
        var now = new Date();
        now.setDate(now.getDate() - 1); //设置成昨天
        cookie.set(key, '', {
            expires: now,
            path:"/"
        });
    }
}
    var tuichu = document.getElementsByClassName('tuichu');
    var yonghu = document.getElementsByClassName('yonghu');
    var lb = document.getElementsByClassName('lb');
    var tj = document.getElementsByClassName('tj');

    var yonghuming = cookie.get('username');
    var oa = cookie.get('oa');
    console.log(yonghuming,oa);

    yonghu[0].innerHTML = yonghuming;
    



    if(oa>0){
        lb[0].setAttribute("style", "display:block;");
        tj[0].innerHTML = '添加用户';
    }else{
        tj[0].setAttribute("href", `useradd_bianji.html?username=${yonghuming}`);
        // tj[0].onclick = function () {
           
        //     window.open("../html/useradd_bianji.html?username=" + );

        // };
        lb[0].setAttribute("style", "display:none;");
        tj[0].innerHTML = '更改信息';
    
    };


tuichu[0].onclick = function(){
    // document.cookie = '';
    cookie.remove('username');
    cookie.remove('oa');
    window.location.href = "../inde.html";

};


