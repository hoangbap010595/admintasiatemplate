var express = require('express');
var csrf = require('csurf')

var router = express.Router();
var csrfProtection = csrf({ cookie: false });

var authController = require('../controllers/auth.controller')

/* GET login page. */
router.get('/', csrfProtection, authController.login);

/* POST login page. */
router.post('/', csrfProtection, authController.postLogin);

/* GET logout page. */
router.get('/logout', authController.logout);

/* GET token API. */
router.post('/token', authController.postLoginApi);

module.exports = router;