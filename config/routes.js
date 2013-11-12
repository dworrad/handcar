var passport = require('./passport');
var dnsmap = require('./dnsmap')
var now = require('performance-now');


module.exports = function routes() {

    //DNS Rewrite all requests to the correct namespace.
    this.match('*', function(req, res, next){
        var start = now();
        if(req.url.indexOf('/api/') != -1){ req.url = req.url }
        else { req.url = dnsmap.rewrite(req.headers.host) + req.url }
        var endt = now();
        next();
    }, { via: ['get', 'post'] });

    //Employee Life Namespace - for main employee life dashboard
    this.namespace('demoapplication', function(){
        this.match('/dashboard', 'dashboard#index');

        this.match('/auth/resetpassword/:resetkey', 'auth#resetpassword');
        this.match('/auth/forgotpassword', 'auth#forgotpassword');
        this.match('/auth/register', 'auth#register');
        this.match('/auth/login', 'auth#login');
        this.match('/auth/logout', 'auth#logout');
        this.match('/auth/activate/:activationkey', 'auth#activate');
    })

    //API Global Namespace
    this.namespace('api', function () {
        //API Version 0 Namespace - Represents the v0 stable api
        this.namespace('v0', function () {
            this.resources('users');

            this.match('forgotpassword', "auth#forgotpassword", { via: ['post'] })
            this.match('resetpassword', "auth#resetpassword", { via: ['post'] })
            this.match('login', "auth#login", { via: ['post'] })
            this.match('register', "auth#register", { via: ['post'] })
            this.match('githubhook', "github#hook", { via: ['post'] })
        })
    })

};
