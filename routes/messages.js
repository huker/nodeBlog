/**
 * Created by huk on 17/3/30.
 */
var express = require('express');

var validate=require('../middle/index.js');
var router = express.Router();

router.get('/',validate.checkLogin,function (req, res) {
    res.render('message/message');
});

module.exports = router;
