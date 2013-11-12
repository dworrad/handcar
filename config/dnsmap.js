var _ = require('underscore')
var dnsmap = {};

dnsmap.mappings = [

    //Localhost DNS
    {name:"localapplication.com", map:"/demoapplication"},
    {name:"www.localapplication.com", map:"/demoapplication"},

    //Production DNS
    {name:"application.com", map:"/demoapplication"},
    {name:"www.application.com", map:"/demoapplication"}

];

dnsmap.rewrite = function(host){
    var rewriteObject = _.findWhere(dnsmap.mappings, {name: host});

    if(rewriteObject){
        return rewriteObject.map
    }else{
        return ""
    }
}

module.exports = dnsmap;