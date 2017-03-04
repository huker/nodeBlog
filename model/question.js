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
    answers:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        creatAt:{type:Date,default:Date.now},
        content:String,
        up:{type:Number,default:0}
    }]
});

var questionModel = mongoose.model('question',questionSchema);

module.exports=questionModel;