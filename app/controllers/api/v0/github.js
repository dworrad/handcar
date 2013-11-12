/**
 * Created by Ryanl on 10/10/13.
 */
//Init Variables
var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var passport = require('passport');
var spawn = require('child_process').spawn;

//Load Modal
var models_path = __dirname + '/../../../../app/models';

//Begin Controller
var GithubController = new Controller();

GithubController.hook = function(){
    var controller = this;

    console.log('github hooks received payload')

    var ref = JSON.parse(controller.req.body.payload).ref;

    if(ref == "refs/heads/master" && environment == "production"){
        GithubController.restartApp();
    }
    else if(ref == "refs/heads/master" && environment == "staging"){
        GithubController.restartApp();
    }
    else if(ref == "refs/heads/test" && environment == "test"){
        GithubController.restartApp();
    }
    else if(ref == "refs/heads/demo" && environment == "demo"){
        GithubController.restartApp();
    }
    else
    {
        console.log("Git Hook Received for Unknown Environment - " + environment + " - Ref : " + ref)
    }

    controller.res.send(200);

}

GithubController.restartApp = function(){
    console.log("Restarting Application Server")
    var command = spawn('sh',['/drives/app/pullupdaterestart.sh'])

    command.stdout.on('data', function (data) {    // register one or more handlers
        console.log('stdout: ' + data);
    });

    command.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    command.on('exit', function (code) {
        console.log('restart App service Exited With Code : ' + code);
    });

}

//Export
module.exports = GithubController;
