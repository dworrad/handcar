var Mustache = require('mustache'),
    request = require('request');

//to: email address i.e user@user.com
//data: data for the template
//template: path to a template
//cb: callback containing an error if failed or null if success.
exports = sendsms = function(to, data, template, cb){
    console.log("sendsms....")

    data.dns = conf[environment].DNS
    data.application_name = conf.ApplicationName

    var fs = require('fs');
    fs.readFile("./templates/sms/" + template, function (err, cdata) {
        if (err) {
            console.log('Cant find sms template most likely');
            cb(null)
        }

        var contents = cdata.toString();
        var compiledTemplate = Mustache.compile(contents);
        var templateOutput = compiledTemplate(data);

        console.log(templateOutput);

        if(conf[environment].CanSendSms || process.env.NODE_ENV == "production" || process.env.NODE_ENV == "demo"){

            request({
                uri: 'http://www.smsglobal.com/http-api.php?action=sendsms&user=' + conf.SmsGlobalUsername + '&password=' + conf.SmsGlobalPassword + '&from=' + conf.SmsGlobalFromName + '&to=' + to + '&text=' + templateOutput
            }, function(error, response, body) {
                console.log(body);
                cb(body)

            });
        }
        else{
            console.log("process env Node env is - ")
            console.log(process.env.NODE_ENV)
            console.log("Sms is NOT sent... This isn't prod, and 'CanSendSms' hasn't been set == true in conf file")
            cb(null)
        }

    });



}