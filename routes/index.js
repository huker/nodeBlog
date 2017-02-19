var express = require('express');
var router = express.Router();
var articleModel=require('../model/article.js');
var markdown=require('markdown').markdown;
//一个路由实例

/* GET home page. */
router.get('/', function(req, res, next) {
  //执行 这里取到的user是id 要用populate转
  articleModel.find().populate('user').exec(function(err,articles){
    if(err){
      req.flash('error',err);
      return res.redirect('/');
    }else{
        articles.forEach(function(article){
        article.content=markdown.toHTML(article.content);
      });
      res.render('index', {articles:articles});
    }
  });

});

module.exports = router;
