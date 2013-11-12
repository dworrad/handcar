//Includes
var locomotive = require('locomotive'),
    _ = require('underscore'),
    Controller = locomotive.Controller;
var passport = require('passport');

var api_path = __dirname + '/../api/' + conf[environment].API_Version

var DashboardController = new Controller();

DashboardController.index = function () {
    var controller = this;

        controller.flash = controller.req.flash()
        controller.render();

};

//Damian: please check the /setup url and move it to where it needs to go in the v2 architecture.
DashboardController.before('*', function(req, res, next){ if(req.isAuthenticated()){ return next() }else{ res.redirect('/auth/login') }})
module.exports = DashboardController;
