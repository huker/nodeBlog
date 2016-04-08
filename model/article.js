/*
* 文章写进数据库
* */
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/nodeBlog');
//定义模型 确定数据库里表结构
var articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    img:String,
    //类型是主键类型 引用的是user
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    creatAt:{type:Date,default:Date.now}
});

//定义model
var articleModel = mongoose.model('article',articleSchema);

module.exports=articleModel;