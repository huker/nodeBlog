var express = require('express');
var router = express.Router();

//一个路由实例

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

module.exports = router;
