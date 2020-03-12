var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller')

/* GET login page. */
router.get('/', authController.login);

/* POST login page. */
router.post('/', authController.postLogin);

module.exports = router;