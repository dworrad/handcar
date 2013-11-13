/**
 * Created by Ryanl on 10/10/13.
 */
//Init Variables
var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var passport = require('passport');
var bcrypt = require('bcrypt');

//Load Modal
var models_path = __dirname + '/../../../../app/models';
require(models_path + '/user.js');

//Begin Controller
var AuthController = new Controller();

AuthController.register = {

    employeelife : function(email, password, cb){
        email = email.toLowerCase();
        User.registerUser(email, password, function(err, user) {
            cb(err, user)
        });

    }

}


//Employee Life Login
AuthController.login = function(){
    var controller = this;
    controller.res.send('Authorized')
}

AuthController.register = function(){
    var controller = this;

    email = controller.req.body.email.toLowerCase();
    User.registerUser(email, controller.req.body.password, function(err, user) {
        if(err){
            controller.res.send('false')
        }else{
            controller.res.send('true')
        }
    });

}

AuthController.forgotpassword = function(){
    var controller = this;

    User.findOne({"email":controller.req.body.email},function(err, user){
        if(err){
            controller.res.send('false')
        }else if(user){
            user.passwordresetkey = guid()
            user.save(function (err) {
                if(err){
                    controller.res.send('false')
                }else{

                    var data = {
                        passwordresetkey:   user.passwordresetkey
                    }

                    sendemail(user.email, templates.PasswordReset.Subject, data, templates.PasswordReset.File, function(result){
                        console.log(result);
                    })

                    controller.res.send('true')
                }
            })
        }else{
            controller.res.send('false')
        }
    })
}

AuthController.resetpassword = function(){
    var controller = this;

    User.findOne({"passwordresetkey":controller.req.session.passwordresetkey},function(err, user){
        if(err){
            controller.res.send('false')
        }else if(user){
            user.passwordresetkey = ""

            bcrypt.hash(controller.req.body.password, 8, function(err, hash) {

                user.hash = hash
                user.save(function (err) {
                    if(err){
                        controller.res.send('false')
                    }else{
                        controller.res.send('true')
                    }
                })

            });


        }else{
            controller.res.send('false')
        }
    })
}


/*
This is an example of how to check if the current user is a MELUser or a User
 console.log(controller.req.user instanceof MELUser) // Returns True || False
 console.log(controller.req.user instanceof User) // Returns True || False
*/

//Passport authentication actions
AuthController.before('login', passport.authenticate('demoapplication'));
//End Controller

//Export
module.exports = AuthController;
