module.exports = environment = process.env.NODE_ENV || 'local'
module.exports = templates = {

    //Activate Account Email Declaration
    Activate : {

        Subject:        "Please Activate Your Account",
        Type:           "Email",
        File:           "activate.mustache"

    },

    //Password Reset Email Declaration
    PasswordReset : {

        Subject:        "Reset your password?",
        Type:           "Email",
        File:           "passwordreset.mustache"

    },

    //Sms Test
    SMSTest : {

        Type:           "Sms",
        File:           "test.mustache"

    }

}