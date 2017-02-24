/**
 * Created by huk on 17/2/19.
 */
var express = require('express');
var router = express.Router();


router.get('/',function (req, res) {
    res.render('question/qaindex');
});

module.exports = router;