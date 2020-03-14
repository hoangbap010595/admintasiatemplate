var express = require('express');
var router = express.Router();
const appConfig = require('../../../config');

/* GET test api. */
router.get('/', function (req, res, next) {
    var data = appConfig.API_ResponseResult(200,"Test API Thanh Cong",{ testOke: new Date().toLocaleString(), user: req.user })
    res.status(200).json(data);
});

module.exports = router;