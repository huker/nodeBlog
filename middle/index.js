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

exports.getTimeForm = function(data) {
    var creatTime = data.creatAt.toLocaleString();
    var timeArr = creatTime.split(',')[0].split('/');
    var timeGet = timeArr[2]+'年'+timeArr[0]+'月'+timeArr[1]+'日';
    return timeGet;
}