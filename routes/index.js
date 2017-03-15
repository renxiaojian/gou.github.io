/**
 * Created by 小剑 on 2017/2/18.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

var mysql = require('mysql');
var md5 = require('./md5');

var connection = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'renxj',
    password:'renxj',
    database:'music'
});


//登陆账号
router.post('/doLogin',function (req,res,next) {
    var userName = req.body.username;
    var passWord = req.body.password;
    console.log(req.body);
    var encryptPassWord = md5(md5(passWord) + '2');
    //查询数据库中，是否有这个用户
    connection.query('SELECT * FROM `user` WHERE username ='+"'"+userName+"'",function(err, result){
        if(err){
            console.log('登陆账号，查询用户：'+err);
        }else{
            if(result.length == 0){
                res.send('-1');     //没有这个用户
                return;
            }else if(encryptPassWord==result[0].password){
                //有的话，进一步看看密码是否正确
                req.session.login = '1';
                req.session.username = userName;
                res.send('1');  //登陆成功
            }else{
                res.send('-2'); //密码错误
            }
        }
    });
});

//注册用户
router.post('/doRegister',function (req, res, next) {
    //创建一个用户对象
    var user = {};
    //得到账号和密码
    console.log(req.body);
    var userName = req.body.username;
    var passWord = req.body.password;

    //查询数据库中是否存在该用户
    connection.query('SELECT * FROM `user` WHERE username ='+"'"+userName+"'",function(err, result){
        if(err){
            console.log('查询数据库中是否存在该用户：'+err);
        }else{
            if(result.length!=0){
                res.send('-1');     //用户已经存在
                return;
            }
            //否则，用户名不存在，进行注册。

            //密码设置md5加密
            passWord = md5(md5(passWord) + '2');
            //用户名没有被占用，插入账号，密码和存储个人喜好音乐JSON文件的路径
            user.userName = userName;
            user.passWord = passWord;

            //将账号密码和文件路径插入到数据库的user表中
            connection.query('INSERT INTO `user` SET ?',user,function (err, result) {
                if(err){
                    console.log('插入数据库用户信息失败：'+err);
                }else{
                    req.session.login = '1';
                    req.session.username = userName;
                    res.send('1');      //注册成功,写入session
                }
            });
        }
    });
});

//判断session
router.get('/sessionCheck',function (req, res, next) {
    if(req.session.login){
        res.send(req.session.username);
    }else{
        res.send("没有成功登陆");
    }
});


module.exports = router;