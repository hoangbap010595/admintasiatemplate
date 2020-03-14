const jwt = require('jsonwebtoken');
const appConfig = require('../config');
const authModel = require('../models/account.model');

//Đăng nhập
module.exports.login = function (req, res, next) {
    res.render('auth/login', { title: 'Đăng nhập hệ thống', csrfToken: req.csrfToken() });
}

module.exports.postLogin = function (req, res, next) {
    //For WEB
    console.log(req.body);
    var { username, password } = req.body;
    var user = authModel.checkLogin(username, password);
    if (user) {
        //res.cookie('session_id', username, { signed: true });
        req.session.user_session = user;
        res.redirect('/');
        return;
    }

    res.render('auth/login', {
        errors: [
            'Tên đăng nhập hoặc mật khẩu không đúng'
        ],
        values: req.body,
        csrfToken: req.csrfToken()
    });
}

//Đăng xuất
module.exports.logout = function (req, res, next) {
    if (req.session.user_session)
        req.session.user_session = null;
    res.redirect('/auth');
    return;
}

//API
module.exports.postLoginApi = function (req, res, next) {
    //For API
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = authModel.checkLogin(username, password);

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, appConfig.APP_SECRET);
        var data = {
            accessToken,
            username: user.username,
            role: user.role
        }
        var result = appConfig.API_ResponseResult(200, 'Đăng nhập thành công', data);
        res.status(200).json(result);
    } else {
        var result = appConfig.API_ResponseResult(400, 'Tên đăng nhập hoặc mật khẩu không đúng', req.body)
        res.status(400).send(result);
    }
}