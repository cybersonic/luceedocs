var fs = require('fs');
var path = require('path');
var marked = require('marked');


exports.get  = function(req, res){


    var md = fs.readFileSync(path.resolve("./docs/" + req.params.page +".md"), 'utf-8');
    //if we find it right?
    res.render('docs/display', {content:marked.parse(md),page: req.params.page +".md"});
}



exports.default  = function(req, res){

        var md = fs.readFileSync(path.resolve("./docs/index.md"), 'utf-8');
        res.render('docs/display', {content:marked.parse(md), page: 'index.md'});
}