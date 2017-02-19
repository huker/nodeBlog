var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var validate = require('../middle/index.js');
var crypto = require('crypto'); //md5

//注册 这里的'/'是当前路由下的根目录 '/users'
router.get('/reg', validate.checkNotLogin, function (req, res) {
    res.render('user/reg');
});
//提交用户注册的表单到服务器
router.post('/reg', validate.checkNotLogin, function (req, res) {
    var user = req.body;
    user.avatar = 'https://secure.gravatar.com/avatar/' + md5(user.email);
    userModel.create(user, function (err, doc) {
        if (err) {
            req.flash('error', err);
            //返回到上一个页面
            res.redirect('back');
        } else {
            req.session.user = doc;
            req.flash('success', '注册成功!');
            res.redirect('/')
        }
    });
});

//登录
router.get('/login', validate.checkNotLogin, function (req, res) {
    res.render('user/login');
});

router.post('/login', validate.checkNotLogin, function (req, res) {
    var user = req.body;
    userModel.findOne(user, function (err, user) {
        if (!err && typeof err === 'object') {
            req.flash('error', '登录失败');
            res.redirect('back');
        } else {
            req.session.user = user;
            req.flash('success', '登陆成功');
            res.redirect('/');
        }
    })

});

//个人中心
router.get('/center', validate.checkLogin, function (req, res) {
    var userDate = req.session.user;
    userModel.findById(userDate._id, function (err, userInfo) {
        if (err) {
            req.flash('error',err);
            res.redirect('back');
        } else {
            res.render('user/center',{user:userInfo});
        }
    })

})

//退出
router.get('/logout', validate.checkLogin, function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;

function md5(email) {
    //console.log(crypto.getHashes());
    //update指定输入的，digest摘要输出
    return crypto.createHash('md5').update(email).digest('hex');//hex十六进制
}