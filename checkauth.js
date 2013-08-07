/**
 * Created with JetBrains WebStorm.
 * User: Alexander
 * Date: 26.07.13
 * Time: 18:50
 * To change this template use File | Settings | File Templates.
 */

Authenticator = function () {
}

Authenticator.prototype.checkLogin = function (req, res, next) {
    if (!req.session.auth || typeof(req.session.user_id) =='undefined') {
        res.writeHead(403);
        res.end('You are not authorized to view this page');
    } else {
        next();
    }
}

Authenticator.prototype.login = function (req, res) {
    var post = req.body;
    if ((post.user == 'test') && (post.pass == 'test')) {
        req.session.auth = true;
        req.session.user_id = post.user;
        res.send('ok');
    } else {
        res.send('error');
    }
}

Authenticator.prototype.logout = function (req, res) {
    req.session.auth = false;
    delete req.session.user_id;
}

exports.Authenticator = Authenticator;
