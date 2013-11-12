var express = require('express'),
    poweredBy = require('connect-powered-by'),
    util = require('util'),
    passport = require('../passport'),
    MongoStore = require('connect-mongo')(express);

module.exports = function() {
    var app = this;

    if (this.version !== require('locomotive').version) {
        console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
    }

    this.set('views', __dirname + '/../../app/views');
    this.set('view engine', 'ejs');
    this.format('html', { extension: '.ejs' })

    this.datastore(require('locomotive-mongoose'));

    this.use(poweredBy('Locomotive'));

    this.set('mongodb uri', conf[environment].database_connection);

    var logger = new (require('winston').Logger)({
        transports: []
    });
    logger.extend(this);
    this.set('logger', logger);

    this.use(express.favicon());
    this.use(express['static'](__dirname + '/../../public'));
    this.use(express.cookieParser());
    this.use(express.bodyParser());

    store = new MongoStore({url: conf[environment].database_connection, clear_interval: 600});
    app.use(express.session({
        secret: 'esoognom',
        store: store
    }));

    this.use(passport.initialize());
    this.use(passport.session());

    this.use(require('connect-flash')());

    this.use(function(req, res, next) {
        res.locals.user = req.user;
        next();
    });

    this.use(this.router);
};
