//Init Variables
var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var passport = require('passport');

//Load Modal
var models_path = __dirname + '/../../../../app/models';
require(models_path + '/user.js');
require(__dirname + "/base/base.js");

//Begin Controller
var UserController = new Controller();

mybase.init(UserController, User);

module.exports = UserController;
//End Controller