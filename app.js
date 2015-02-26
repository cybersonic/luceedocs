process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();

app.listen(3000);
module.exports = app;
//var env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
//if(env === 'production'){
//	require('newrelic');
//}
//var express = require("express");
//	express.Server = express.HTTPServer;
//var app = express();
//var mongoose = require('./config/mongoose.js');
//
//
//

//var http = require('http').Server(app);
//
//var fs = require('fs');



//

//
//
//app.set('port', (process.env.PORT || 3000));
//
//app.listen(app.get("port"),function(){
//	console.log("listening on *:"+ app.get("port"));
//});
console.log('Server running at http://localhost:3000');
