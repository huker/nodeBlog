/*
* 回答model
* */
var mongoose = require('mongoose');
var answerSchema = new mongoose.Schema({
    title:String,
    content:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    creatAt:{type:Date,default:Date.now},
    question:{type:mongoose.Schema.Types.ObjectId,ref:'question'},
    up:{type:Number,default:0}
});

var answerModel = mongoose.model('answer',answerSchema);

module.exports=answerModel;