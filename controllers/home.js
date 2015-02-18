var version = require('../model/version.js');
var packageinfo = require('../package.json');

exports.index = function(req,res){

	res.render("home");
}

exports.before = function(req,res, next){

	res.locals.title =  packageinfo.name;
	res.locals.version = version.current();
 	next();
}