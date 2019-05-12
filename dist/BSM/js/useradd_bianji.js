$(function(){

    //页面渲染
    //编辑用户信息渲染
    // 用户信息编辑
    //(问号以后的字符串)
    var aaa = window.location.search.substring(1);
    // (等号以后的字符串，及你所要的参数)
    var a2 = aaa.split('=')[1];

    var title = decodeURI(a2); //只需要转一次码  中文乱码转码
     //发送ajax请求
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                
                var arr = res.map(function(item){
                    return `
                        <div class="layui-form-item">
                            <label class="layui-form-label">用户名：</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入用户名" class="layui-input username" value="${item.username}">
                    </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">签名： </label>
                                <div class="layui-input-block">
                                    <input type="text" name="username" placeholder="请输入" lay-verify="required" placeholder="" autocomplete="off" class="layui-input signature" value="${item.signature}">
                    </div>
                                </div>

                                <div class="layui-form-item">
                                    <label class="layui-form-label">密码：</label>
                                    <div class="layui-input-inline">
                                        <input type="password" name="password" lay-verify="pass" autocomplete="off" class="layui-input password" value="${item.password}">
                </div>
                                        <div class="layui-form-mid layui-word-aux">请填写6到12位密码</div>
                                    </div>

                                    <div class="layui-form-item">
                                        <label class="layui-form-label">确认密码：</label>
                                        <div class="layui-input-inline">
                                            <input type="password" name="password" lay-verify="pass" autocomplete="off" class="layui-input password2">
                </div>
                                        </div>


                                        <div class="layui-form-item">
                                            <div class="">
                                                <label class="layui-form-label">住址：</label>
                                                <div class="layui-input-inline">
                                                    <input type="text" class="layui-input shouji address" value="${item.address}">
                        </div>
                                                </div>
                                                <div class="layui-inline">
                                                    <label class="layui-form-label">性别选择</label>
                                                    <div class="layui-input-inline">
                                                        <select name="gender" lay-verify="" class="sex" value="${item.sex}">
                                                            <option value="男">男</option>
                                                            <option value="女">女</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="layui-form-item">
                                                <label class="layui-form-label">评分：</label>
                                                <div class="layui-input-inline">
                                                    <input type="text" name="password" lay-verify="title" class="layui-input shengri grade" value="${item.grade}">
                        </div>
                                                </div>

                                                <div class="layui-form-item">
                                                    <label class="layui-form-label">职业：</label>
                                                    <div class="layui-input-inline">
                                                        <input type="text" name="" lay-verify="title" class="layui-input shengri profession" value="${item.profession}">
                        </div>
                                                    </div>

                                                    <div class="layui-form-item">
                                                        <label class="layui-form-label">添加时间：</label>
                                                        <div class="layui-input-block">
                                                            <input type="text" name="title" lay-verify="regdata" autocomplete="off" class="layui-input regdata" value="${item.regdata}">
                        </div>

                                                        </div>

                                                        <div class="layui-form-item layui-form-text">
                                                            <label class="layui-form-label">备注：</label>
                                                            <div class="layui-input-block">
                                                                <textarea class="layui-textarea" placeholder="123123"></textarea>
                                                            </div>
                                                        </div>

                                                        <div class="layui-form-item">
                                                            <div class="layui-input-block">
                                                                <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
                                                            </div>
                                                        </div>
                                        </form>`;
                                                        }).join('');

                $('#box').html(arr);

               



                }

            $('.layui-btn').on('click', function () {
                //监听提交

                    let username = $('.username').val();
                    let sex = $('.sex').val();
                    let address = $('.address').val();
                    let signature = $('.signature').val();
                    let profession = $('.profession').val();
                    let grade = $('.grade').val();
                    let regdata = $('.regdata').val();
                    let oa = 0 * 1;
                    let password = $('.password').val();
                    let _id = res[0]._id;
                    // //发送ajax请求
                    // console.log(_id);

                        var xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            if (xhr.status == 200) {

                                alert('修改成功');
                                // location.reload();//刷新页面
                            }
                        }
                xhr.open('get', `/userlist_login/gengai?oldname=${title}&username=${username}&sex=${sex}&address=${address}&signature=${signature}&profession=${profession}&grade=${grade}&regdata=${regdata}&oa=${oa}&password=${password}`, true);
                        xhr.send(null);
                // console.log(111)
            });

              }
            xhr.open('get', '/userlist_login/bianji?username=' + title, true);
                                        
            xhr.send(null);
                              

});