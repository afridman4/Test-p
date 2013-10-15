/**
 * Created with JetBrains WebStorm.
 * User: Alexander
 * Date: 26.07.13
 * Time: 18:50
 * To change this template use File | Settings | File Templates.
 */

Authenticator = function (dbDriver) {
    Authenticator.driver = dbDriver;
}

Authenticator.prototype.checkLogin = function (req, res, next) {
    console.log("checking auth");
    if (!req.session.auth || typeof(req.session.user_id) =='undefined') {
        res.writeHead(403);
        res.end('You are not authorized to view this page');
    } else {
        next();
    }
}

Authenticator.prototype.checkAdminLogin = function (req, res, next) {
    console.log("checking Admin auth");
    if (!req.session.auth || typeof(req.session.user_id) =='undefined'
        || typeof(req.session.role) == 'undefined' || req.session.role != 1) {
        res.writeHead(403);
        res.end('You are not authorized to view this page');
    } else {
        next();
    }
}
Authenticator.prototype.login = function (req, res) {
    Authenticator.driver.getDocs('users', {login: req.body.user, password: req.body.pass}, function(err, results) {
        console.log("after get users "+err + "res "+results.length);
        if (err) {
            req.send(500, err);
        } else if (results.length == 0) {
            res.send(404, "No such user or password")
        } else {
            req.session.auth = true;
            req.session.user_id = req.body.user;
            req.session.role = results[0].role;
            res.send(201, 'ok');
        }
    });
}

Authenticator.prototype.logout = function (req, res) {
    req.session.auth = false;
    delete req.session.user_id;
}

exports.Authenticator = Authenticator;
