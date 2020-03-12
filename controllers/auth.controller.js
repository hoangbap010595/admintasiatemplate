module.exports.login = function (req, res, next) {
    res.render('auth/login', { title: 'Express' });
}

module.exports.postLogin = function (req, res, next) {
    console.log(req.body);
    res.send('postLogin');
}