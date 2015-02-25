var express = require('./config/express');
var app = express();

app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000');
//var env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
//if(env === 'production'){
//	require('newrelic');
//}
//var express = require("express");
//	express.Server = express.HTTPServer;
//var app = express();
//var mongoose = require('./config/mongoose.js');
//
//var expressLayouts = require('express-ejs-layouts');
//
//var favicon = require('serve-favicon');
//var http = require('http').Server(app);
//var ejs = require('ejs');
//var fs = require('fs');
//require('nodedump');
//var raven = require('raven');
//var client = new raven.Client('https://813fce3ad7c04dbea6f0730b9d4d39c8:5d9628bffbaf43feb6769b6294042596@cmdbase-sentinel.herokuapp.com/2');
//var bodyParser = require('body-parser');
//app.use( bodyParser.json() );
//app.use( bodyParser.urlencoded({
//    extended: true
//}));
//
//
//
//var version = require('./controllers/version');
//var tag = require('./controllers/tag');
//var func = require('./controllers/function');
//var obj = require('./controllers/object');
//var home = require('./controllers/home');
//var search = require('./controllers/search');
//
//
//
//app.use(favicon(__dirname + '/public/favicon.png'));
//app.use(home.before);
//app.set('view engine', 'ejs');
//app.set('layout', "layout/layout");
//app.use(expressLayouts);
//app.use(express.static(__dirname + '/public'));
//
//app.get('/', home.index);
//app.get('/versions*', version.list);
//app.get('/search/', search.find);
//app.get('/search/:term', search.find);
//app.get('/tags', tag.list);
//app.get('/tags/:filter', tag.list);
//app.get('/tags/:filter/:value', tag.list);
//app.get('/tag/:id', tag.get);
//app.get('/functions', func.list);
//app.get('/objects', obj.listObjects);
//app.get('/object/:type/:function', obj.getObject);
//app.get('/functions/:filter', func.list);
//app.get('/function/:id', func.get);
//
//
//
////Shortcuts for old site.
//app.get('/index.cfm', home.index);
//app.get('/index.cfm/versions*', version.list);
//app.get('/index.cfm/search/', search.find);
//app.get('/index.cfm/search/:term', search.find);
//app.get('/index.cfm/tags', tag.list);
//app.get('/index.cfm/tags/:filter', tag.list);
//app.get('/index.cfm/tags/:filter/:value', tag.list);
//app.get('/index.cfm/tag/:id', tag.get);
//app.get('/index.cfm/functions', func.list);
//app.get('/index.cfm/objects', obj.listObjects);
//app.get('/index.cfm/object/:type/:function', obj.getObject);
//app.get('/index.cfm/functions/:filter', func.list);
//app.get('/index.cfm/function/:id', func.get);
//
//
//app.use(function(req, res, next){
//	// the status option, or res.statusCode = 404
//	// are equivalent, however with the option we
//	// get the "status" local available as well
//	client.catpureMessage("404 for " + req.url);
//	res.render('404', { status: 404, url: req.url });
//});
//
//app.use(function(err, req, res, next){
//	// we may use properties of the error object
//	// here and next(err) appropriately, or if
//	// we possibly recovered from the error, simply next().
//    console.log(err);
//	client.captureError(err);
//	res.render('500', {
//		status: err.status || 500
//		, error: err
//	});
//});
//
//
//app.set('port', (process.env.PORT || 3000));
//
//app.listen(app.get("port"),function(){
//	console.log("listening on *:"+ app.get("port"));
//});
