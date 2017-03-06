/*
* 评论model
* */
var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    title:String,
    content:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    creatAt:{type:Date,default:Date.now},
    article:{type:mongoose.Schema.Types.ObjectId,ref:'article'},
});

var commentModel = mongoose.model('comment',commentSchema);

module.exports=commentModel;