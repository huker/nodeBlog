var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var articleModel=require('../model/article.js');
var qaModel=require('../model/question.js');
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
    user.roles = 1;
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
        console.log(arguments)
        if (!user && typeof user === 'object' && user.roles == 0) {
            req.flash('error', '登录失败');
            res.redirect('back');
        } else {
            if(user.roles != 1){
                req.flash('error', '登录失败');
                res.redirect('back');
            }else{
                req.session.user = user;
                req.flash('success', '登陆成功');
                res.redirect('/');
            }
        }
    })

});

//----------------个人中心 start-----------------
router.get('/center', validate.checkLogin, function (req, res) {
    var userDate = req.session.user;
    userModel.findById(userDate._id, function (err, userInfo) {
        if (err) {
            req.flash('error',err);
            res.redirect('back');
        } else {
            console.log(userInfo);
            findUserArticle(userDate._id,res,function (data) {
                var articleData = data;
                res.render('user/center',{user:userInfo,articles:articleData});
            });

        }
    })
});
//别的用户的center(用户id查询 判断下是否是自己)
router.get('/userCenter/:_id',validate.checkLogin,function (req, res) {
    var userNow = req.session.user;
    if (req.params._id === userNow._id) {
        res.redirect('/users/center');
    } else{
        userModel.findById(req.params._id, function (err, userInfo) {
            if (err) {
                req.flash('error',err);
                res.redirect('back');
            } else {
                findUserArticle(req.params._id,res,function (data) {
                    var articleData = data;
                    res.render('user/centerOther',{user:userInfo,articles:articleData});
                });

            }
        })
    }
});
//查询tip列表(不分是否是自己 用userid查找)
//文章列表
router.get('/userCenter/article/:_id',validate.checkLogin,function (req, res) {
    findUserArticle(req.params._id,res,function (data) {
        res.send(data);
    });
});
//提问列表
router.get('/userCenter/ask/:_id',validate.checkLogin,function (req, res) {
    qaModel.find({user:req.params._id},function (err, data) {
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            res.send(data)
        }
    })
});
//回答列表
router.get('/userCenter/answer/:_id',validate.checkLogin,function (req, res) {
    res.send()
});
//comment列表
router.get('/userCenter/comment/:_id',validate.checkLogin,function (req, res) {
    res.send()
});
/**
 *用户中心文章列表
 * @param userId 选择的用户的id
 */
function findUserArticle(userId,res,cb){
    articleModel.find({user:userId},function (err,data) {
        if (err) {
            req.flash('error',err);
            res.redirect('back');
        }else{
            cb(data);
        }
    })
}

//用户的个人资料修改
router.post('/center/sex', validate.checkLogin, function (req, res) {
    var userData = req.session.user;
    userModel.findByIdAndUpdate(userData._id,{$set:{sex:req.body.value}},{new: true}, function (err, user) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            res.send(user);
        }
    })
})
router.post('/center/local', validate.checkLogin, function (req, res) {
    var userData = req.session.user;
    userModel.findByIdAndUpdate(userData._id,{$set:{local:req.body.value}},{new: true}, function (err, user) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            res.send(user);
        }
    })
})
router.post('/center/year', validate.checkLogin, function (req, res) {
    var userData = req.session.user;
    userModel.findByIdAndUpdate(userData._id,{$set:{year:req.body.value}},{new: true}, function (err, user) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            res.send(user);
        }
    })
});

//------------------------个人中心 end -----------------------------------

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