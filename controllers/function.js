var version = require('../model/version.js');
var fun = require('../model/function.js');
var util = require('./util.js');


String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};


exports.list = function(req, res){
	var currentversion = version.current();
	var functions = fun.list(currentversion);
	if(util.isApi(req)){
		res.json(functions);
		return;
	}
	res.locals.title = "Lucee Functions Documentation";
	res.render('function/list', {functions:functions});

};


exports.get = function(req, res){
	var id = util.stripJSONSuffix(req.params.id);
	var currentversion = version.current();
	var functionData = fun.get(id, currentversion);

	if (functionData === undefined) {
		return res.render('404', { status: 404, url: req.url });
	}

	if(util.isApi(req)){
		res.json(functionData);
		return;
	}
	res.locals.title = "Lucee " + id.capitalize() + " Function Documentation";
	res.render('function/view', {
		func : functionData,
		version: currentversion,
		tagcode: fun.toTagCode(functionData),
		scriptcode: fun.toTagCode(functionData),
		arginfo : fun.argumentTitles(),
		argumentcode : fun.toArgumentString(functionData),
		examplecode : fun.toExampleCode(functionData)

	});

};


