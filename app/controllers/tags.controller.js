 var version = require('../../model/version.js');
 var tag = require('../../model/tag.js');
 var ejs = require('ejs');
 var util = require('./../../controllers/util.js');

exports.list = function(req, res){
	var currentversion = version.current();
	var taglist = [];


	taglist =  tag.list(currentversion);


	if(util.isApi(req)){
		res.json(taglist);
		return;
	}
	res.locals.title = "Lucee Tag Documentation";
	res.render('tag/list', { tags: taglist, version: currentversion });
};


exports.get = function(req, res){

	var id = util.stripJSONSuffix(req.params.id);
	var currentversion = version.current();
    var marked=require('marked');


    var cleansedTag = util.cleanTag(id)

	if (cleansedTag === undefined) {
		return res.render('404', {status: 404, url: req.url});
	}

	var tagdata = tag.get(cleansedTag, currentversion);



	if (tagdata === undefined) {
		return res.render('404', { status: 404, url: req.url });
	}

	if(util.isApi(req)){
			res.json(tagdata);
			return;
	}

	res.locals.title = "Lucee "+ id +" Tag Documentation";
	res.render('tag/view', {
		 tag : tagdata,
		 version: currentversion,
         type: "tag",
         examples:[],
		 tagcode:tag.toTagCode(tagdata),
		 scriptcode:tag.toScriptCode(tagdata),
		 examplecode:tag.toExampleCode(tagdata),
		 attrinfo : tag.attributeTitles(),
         renderMarkdown : marked

    });
};


