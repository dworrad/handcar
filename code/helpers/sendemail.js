var email = require('mailer')

//to: email address i.e user@user.com
//application: myemployeelife. employeelife.
//subject: subject of the email in question
//data: data for the template
//template: path to a template
//cb: callback containing an error if failed or null if success.
exports = sendemail = function(to, application, subject, data, template, cb){
    console.log("sendemail....")
    if(to.indexOf("user") != 0){

        var settings = {
            domain: "smtp.sendgrid.net",
            host: "smtp.sendgrid.net",
            port : 587,
            authentication: "login",
            username: conf[environment].Email.Username,
            password: conf[environment].Email.Password,
            to : to,
            from : conf[environment].Email.From,
            subject : subject,
            data: data,
            template: "./templates/email/" + template + ".mustache"
            //template: template

        };

        console.log("Email settings")
        console.log(JSON.stringify(settings))

        console.log("Conf Can Send Email - " + conf[environment].CanSendEmail)
        console.log("process.env.NODE_ENV - " + process.env.NODE_ENV)


        if(conf[environment].CanSendEmail || process.env.NODE_ENV == "production" || process.env.NODE_ENV == "demo"){
            email.send(settings, function(err, result) {
                if(err) {
                    console.log("Error - " + err)
                    // An error occurred. Handle it

                    cb(err)
                }
                else
                {
                    console.log("Mail send result - " + result)
                    cb(null)
                }
                // Your message has been sent!
            });
        }
        else{
            console.log("process env Node env is - ")
            console.log(process.env.NODE_ENV)
            console.log("Mail is NOT sent... This isn't prod, and 'isemail' hasn't been set == true in conf file")
            cb(null)
        }

    }
    else
    {
        console.log("Mail NOT sent... This is a test email address!")
        cb(null)
    }

}