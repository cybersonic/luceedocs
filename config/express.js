var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var favicon = require('serve-favicon');
var raven = require('raven');
var client = new raven.Client('https://813fce3ad7c04dbea6f0730b9d4d39c8:5d9628bffbaf43feb6769b6294042596@cmdbase-sentinel.herokuapp.com/2');
var ejs = require('ejs');
var bodyParser = require('body-parser');

    morgan = require('morgan');
    compress = require('compression');

module.exports = function(){

    var app = express();

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }
    else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    app.use(expressLayouts);
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({
        extended: true
    }));

    require('../app/routes/gists')(app);
    require('../app/routes/home')(app);
    require('../app/routes/version')(app);
    require('../app/routes/search')(app);
    require('../app/routes/tags')(app);
    require('../app/routes/functions')(app);
    require('../app/routes/objects')(app);

    app.use(favicon(__dirname + '/../public/favicon.png'));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.set('layout', "layout/layout");
    app.use(express.static('./public'));

    app.use(function(req, res, next){
	// the status option, or res.statusCode = 404
	// are equivalent, however with the option we
	// get the "status" local available as well
	    client.catpureMessage("404 for " + req.url);
	    res.render('404', { status: 404, url: req.url });
    });

    app.use(function(err, req, res, next){

	    client.captureError(err);
        res.render('500', {
            status: err.status || 500
            , error: err
        });
    });

    return app;
}