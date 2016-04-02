var mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/nodeBlog');

//定义模型 确定数据库里表结构
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
//定义model
var userModel = mongoose.model('user',userSchema);

module.exports=userModel;