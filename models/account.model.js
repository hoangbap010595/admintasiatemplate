
module.exports.users = [
    {
        username: 'hoang',
        password: '123456',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'member',
        role: 'member'
    }
];


module.exports.checkLogin = (username, password) => {
    var user = this.users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password.toLowerCase() === password.toLowerCase());
    if (user)
        return user;
    return null;
}