var version = require('../../model/version.js');
var fun = require('../../model/function.js');
var util = require('./../../controllers/util.js');



exports.listObjects = function(req, res){
    var currentversion = version.current();
    var objects = fun.listObjects(currentversion);
    if(util.isApi(req)){
        res.json(objects );
        return;
    }

    res.locals.title = "Lucee Object Member Functions Documentation";
    res.render('object/list', {objects:objects});

};

exports.getObject = function(req, res){


    var func = req.params.function;
    var type = req.params.type;

    var currentversion = version.current();
    var functionData = fun.getByTypeAndFunction(type , func, currentversion);
    var marked=require('marked');



    if(util.isApi(req)){
        res.json(functionData);
        return;
    }
    res.locals.title = "Lucee " + type.capitalize() + "."+ func + "() Function Documentation";


    res.render('object/view', {
        func : functionData,
        version: currentversion,
        tagcode: fun.toObjectCode(functionData),
        arginfo : fun.argumentTitles(),
        argumentcode : fun.toArgumentString(functionData),
        renderMarkdown : marked

    });

};