/**
 * Created by 小剑 on 2017/2/26.
 */
$(function () {

    $('#loginName').focus(function () {
        $('.userWran').html('');
    });

    $('#loginPassword').focus(function () {
        $('.passWran').html('');
    });

    //账号登陆发ajax请求
    $('#login-btn').on('click',function () {
        $.ajax({
            url:'/index/doLogin',
            type:'post',
            dataType:'json',
            data:{
                'username':$('#loginName').val(),
                'password':$('#loginPassword').val()
            },
            success:function (data) {
                console.log('登陆请求发送成功：'+data);
                if(data=='1'){
                    console.log('登陆成功！');
                    window.location = './gou.html';
                    // sessionCheck();
                }else if(data=='-1'){
                    //用户名被占用，请重新输入
                    console.log('用户不存在');
                    $('.userWran').html('用户名不存在');
                }else if(data=='-2'){
                    console.log('密码错误');
                    $('.passWran').html('密码错误');
                }
            },
            err:function (err) {
                console.log('账号登陆失败：'+err);
            }
        });
    });

    //注册账号发ajax请求
    $('#registerbtn').on('click',function () {
        $.ajax({
            url:'/index/doRegister',
            type:'post',
            dataType:'json',
            data:{
                'username':$('#regName').val(),
                'password':$('#regPassword').val()
            },
            success:function (data) {
                if(data=='1'){
                    console.log('注册成功！');
                    window.location = './gou.html';
                    // sessionCheck();
                }else if(data=='-1'){
                    //用户名被占用，请重新输入
                    console.log('账号已经被注册，请重新输入');
                    $('.warning').html('账号已经被注册，请重新输入');
                }
            },
            err:function (err) {
                console.log('注册账号请求错误：'+err);
            }
        })
    });

    //判断session
    function sessionCheck() {
        $.ajax({
            url:'/index/sessionCheck',
            type:'get',
            success:function (data) {
                console.log('session成功获取！'+data);
            },
            err:function (err) {
                console.log('判断session出错'+err);
            }
        });
    }



});