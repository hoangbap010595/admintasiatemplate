const jwt = require('jsonwebtoken');
const appConfig = require('../config');

var auth = {
    ApiAuthJWT: function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, appConfig.APP_SECRET, (err, user) => {
                if (err) {
                    var data = appConfig.API_ResponseResult(403, "Bạn không được phép truy cập vào tài nguyên này.", {})
                    return res.status(403).json(data);
                }
                req.user = user;
                next();
            });
        } else {
            var data = appConfig.API_ResponseResult(401, "Phiên làm việc đã kết thúc. Vui lòng đăng nhập lại", {})
            res.status(401).json(data);
            return;
        }
    },
    AppAuth: (req, res, next) => {
        const user_session = req.session.user_session;
        if (user_session) {
            next();
        } else {
            res.redirect('/auth');
            return;
        }
    }
}


module.exports = auth;