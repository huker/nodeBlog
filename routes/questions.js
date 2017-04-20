/**
 * Created by huk on 17/2/19.
 */
var express = require('express');
var router = express.Router();
var validate=require('../middle/index.js');
var qaModel = require('../model/question.js');
var asModel = require('../model/answer.js');
var async = require('async');

router.get('/',function (req, res) {
    qaModel.find().populate('user').exec(function (err, qa) {
        var nowDate = new Date().getTime();
        var newArr = [];
        for(var i =0;i<qa.length;i++){
            var item = qa[i];
            var timeCut = (nowDate - item.creatAt.getTime())/1000/60;
            if(timeCut<2){
                item.timePrint = '刚刚';
            }else if(timeCut>=1440){
                item.timePrint = Math.floor(timeCut/1440)+'天前';
            }else if(timeCut>=60&&timeCut<1440){
                item.timePrint = Math.floor(timeCut/60)+'小时前';
            }else{
                item.timePrint = Math.floor(timeCut)+'分钟前';
            }
            newArr.push(item);
        }
        res.render('question/qaindex',{questions:newArr});
    });

});

router.get('/add',validate.checkLogin,function (req, res) {
    res.render('question/qaadd',{question:{}});
});

router.post('/add',validate.checkLogin,function (req, res) {
    var question = req.body;
    var userData = req.session.user;
    question.user = userData;
    qaModel.create(question,function (err,qa) {
        if(err){
            req.flash('error','问题发表失败');
            res.redirect('back');
        }else{
            req.flash('success','问题发表成功');
            res.redirect('/questions');
        }
    })
});
router.get('/detail/:_id',validate.checkLogin,function (req, res) {
    qaModel.findById(req.params._id).populate('user').populate('answers.user').exec(function (err, qaData) {
        if(err){
            req.flash('error','读取问题失败');
            res.redirect('back');
        }else{
            qaData.timeGet = validate.getTimeForm(qaData);
            for(var i=0;i<qaData.answers.length;i++){
                qaData.answers[i]['timeGet'] = validate.getTimeForm(qaData.answers[i]);
            }
            res.render('question/qadetail',{qa:qaData})
        }
    })
});

router.post('/answer',validate.checkLogin,function (req,res) {
    var userDate = req.session.user;
    var push = {answers:{content:req.body.content,user:userDate._id}};
    qaModel.update({_id:req.body._id},{$push:push}).populate('user').exec(function (err, result) {
        if(err){
            req.flash('error','回答失败');
            res.redirect('back');
        }else{
            res.redirect('/questions/detail/'+req.body._id);
        }
    });
});
//点赞
router.post('/answer-up',validate.checkLogin,function (req, res) {
    var setdata = {"answers.$.up":req.body.up};
    qaModel.update({"answers._id":req.body._aid},{$set:setdata},function (err, result) {
        if(err){
            req.flash('error','回答失败');
            res.redirect('back');
        }else{
            console.log(result)
            var data = {"success":true};
            res.end(JSON.stringify(data));
        }
    });
});

module.exports = router;