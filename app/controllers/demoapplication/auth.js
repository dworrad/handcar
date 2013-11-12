//Includes
var locomotive = require('locomotive'),
    Controller = locomotive.Controller;
var passport = require('passport');

//Api
var api_path = __dirname + '/../api/' + conf[environment].API_Version
var auth_api = require(api_path + '/auth.js')
var user_api = require(api_path + '/users.js')

//Controller
var AuthController = new Controller();

AuthController.register = function () {
    var controller = this;
    controller.flash = controller.req.flash();
    controller.render();

};

AuthController.login = function () {
    var controller = this;
    controller.flash = controller.req.flash();
    controller.render();
};

AuthController.logout = function() {
    var controller = this;
    controller.req.logout();
    controller.req.flash('success', 'You have been signed out.' )
    controller.res.redirect('/auth/login');
}

AuthController.forgotpassword = function(){
    var controller = this;
    controller.render();
}
AuthController.resetpassword = function(){
    var controller = this;
    controller.req.session.passwordresetkey = controller.req.params.resetkey;
    controller.render();
}

//Exports
module.exports = AuthController;
