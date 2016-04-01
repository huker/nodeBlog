var express = require('express');
var router = express.Router();

/* GET users listing. */

//这里的/是当前路由下的根目录 /users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
