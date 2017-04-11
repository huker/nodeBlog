/**
 * Created by huk on 17/2/19.
 */
var express = require('express');
var router = express.Router();
var validate=require('../middle/index.js');
var qaModel = require('../model/question.js');
var articleModel = require('../model/article.js');

router.get('/',validate.checkLogin,function (req, res) {
    res.render('topic/topicIndex');
});

router.get('/search/:_content',validate.checkLogin,function (req, res) {
    var content = req.params._content;
    var list = {};
    articleModel.find({content:new RegExp(content)},function (err1, articledata) {
        if(err1){
            req.flash('error','查询失败');
        }else{
            list.article = articledata;
        }
    }).then(function () {
        qaModel.find({content:new RegExp(content)},function (err2, qsdata) {
            if(err2){
                req.flash('error','文章删除失败');
            }else{
                list.qs = qsdata;
                res.render('topic/search',{data:list})
                }
            })
        }
    )
});


module.exports = router;