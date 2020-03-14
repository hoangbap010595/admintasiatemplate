var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.middleware')


/* GET home page. */
router.get('/', auth.AppAuth, function (req, res, next) {
  res.render('index', { title: 'Bảng điều khiển' });
});

module.exports = router;
