/*
* 中间件
* */

exports.checkLogin=function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    if(req.session.user){
        next();
    }else{
        req.flash('error','未登录');
        res.redirect('/users/login');
    }
};

exports.checkNotLogin=function(req,res,next){
    if(req.session.user){
        req.flash('error','已登录');
        res.redirect('/');
    }else{
        next();
    }
};