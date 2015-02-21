var fs = require('fs');
var path = require('path');
var marked = require('marked');


exports.get  = function(req, res){
	//check if exists, otherwise 404
	fs.exists(path.resolve("./docs/" + req.params.page +".md"),function(exists){
		if(exists){
			var md = fs.readFileSync(path.resolve("./docs/" + req.params.page +".md"), 'utf-8');
    		res.render('docs/display', {content:marked.parse(md),page: req.params.page +".md"});	
		} else {
			return res.render('404', { status: 404, url: req.url });	
		}
	});
	
    
}



exports.default  = function(req, res){

        var md = fs.readFileSync(path.resolve("./docs/index.md"), 'utf-8');
        res.render('docs/display', {content:marked.parse(md), page: 'index.md'});
}