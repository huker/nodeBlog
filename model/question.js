/*
* 问答model
* */
var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
    title:String,
    content:String,
    img:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    creatAt:{type:Date,default:Date.now},
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        creatAt:{type:Date,default:Date.now},
        content:String
    }]
});

var questionModel = mongoose.model('question',questionSchema);

module.exports=questionModel;