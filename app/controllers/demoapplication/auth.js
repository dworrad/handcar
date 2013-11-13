//Includes
var locomotive = require('locomotive'),
    Controller = locomotive.Controller;
var passport = require('passport');

//Api
var api_path = __dirname + '/../api/' + conf[environment].API_Version
var models_path = __dirname + '/../../../app/models';
require(models_path + '/user.js');

//Controller
var AuthController = new Controller();

AuthController.register = function () {
    var controller = this;
    controller.flash = controller.req.flash();
    controller.render();

};

AuthController.activate = function () {
    var controller = this;

    var activationkey = controller.req.params.activationkey;

    User.findOne({"activationkey": activationkey}, function(err, user){
        if(!err){
            user.activate(function(result){console.log(result)});
        }
    })

    controller.req.flash("success","Your account is now active, please login.")
    controller.redirect("/auth/login");

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
