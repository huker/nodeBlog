/**
 * Created by huk on 17/2/19.
 */
var express = require('express');
var router = express.Router();
var validate=require('../middle/index.js');
var qaModel = require('../model/question.js');

router.get('/',function (req, res) {
    res.render('topic/topicIndex');
});

module.exports = router;