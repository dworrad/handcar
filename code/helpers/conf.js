module.exports = environment = process.env.NODE_ENV || 'local'
module.exports = conf = {

    ApplicationName:           "Demo Application",
    SmsGlobalUsername:         "t7b4smcx",
    SmsGlobalPassword:         "JVx7R3wM",
    SmsGlobalFromName:         "Demo App",

    production : {

        database_connection:        "mongodb://localhost/productiondemoapplication",
        API_Version:                "v0",
        CanSendEmail:               true,
        CanSendSms:                 true,

        DNS:                        "http://www.prod.localapplication.com",

        Email:  {
            From:                     "demoapplication <admin@localapplication.com>",
            Username:                 "dworrad",
            Password:                 "albertst"
        }

    },

    staging : {

        ApplicationName:           "Demo Application",
        database_connection:        "mongodb://localhost/stagingdemoapplication",
        API_Version:                "v0",
        CanSendEmail:               true,
        CanSendSms:                 true,

        DNS:                        "http://www.staging.localapplication.com",
        Email:  {
            From:                     "demoapplication <admin@localapplication.com>",
            Username:                 "dworrad",
            Password:                 "albertst"
        }
},

    demo : {

        database_connection:        "mongodb://localhost/demodemoapplication",
        API_Version:                "v0",
        CanSendEmail:               true,
        CanSendSms:                 true,

        DNS:                        "http://www.demo.localapplication.com",
        Email:  {
            From:                     "demoapplication <admin@localapplication.com>",
            Username:                 "dworrad",
            Password:                 "albertst"
        }

    },

    test : {

        database_connection:        "mongodb://localhost/testdemoapplication",
        API_Version:                "v0",
        CanSendEmail:               true,
        CanSendSms:                 true,

        DNS:                        "http://www.test.localapplication.com",
        Email:  {
            From:                     "demoapplication <admin@localapplication.com>",
            Username:                 "dworrad",
            Password:                 "albertst"
        }
    },

    local : {

        database_connection:        "mongodb://localhost/localdemoapplication",
        API_Version:                "v0",
        CanSendEmail:               true,
        CanSendSms:                 true,

        DNS:                        "http://www.localapplication.com",
        Email:  {
            From:                     "demoapplication <admin@localapplication.com>",
            Username:                 "dworrad",
            Password:                 "albertst"
        }

    }

}