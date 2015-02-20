var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var version = require('./model/version.js');
var currentVersion = version.current();

var tag = require('./model/tag.js');
var func = require('./model/function.js');
var obj = require('./model/object.js');

var exporttype = process.env.TYPE ? process.env.TYPE: 'markdown';

var extension = 'md';


var versionMarkdownPath = './export/' + currentVersion  + '/' + exporttype;
var tagMarkdownPath = versionMarkdownPath + '/tags/';
var funcMarkdownPath = versionMarkdownPath + '/functions/';
var objMarkdownPath = versionMarkdownPath + '/objects/';

var exportpath = {
    'tag': path.resolve(versionMarkdownPath + '/tags/'),
    'func': path.resolve(versionMarkdownPath + '/functions/'),
    'obj': path.resolve(versionMarkdownPath + '/objects/')

};

var templates = {
    'tag': path.resolve('./templates/' + exporttype + '/tag.ejs'),
    'func': path.resolve('./templates/' + exporttype + '/func.ejs'),
    'obj': path.resolve('./templates/' + exporttype + '/obj.ejs')
};



checkAndCreatePath(versionMarkdownPath);
checkAndCreatePath(funcMarkdownPath);
checkAndCreatePath(tagMarkdownPath);
checkAndCreatePath(objMarkdownPath);


renderItems(tag, currentVersion, "tag", tagMarkdownPath);
renderItems(func, currentVersion, "func", funcMarkdownPath);
renderItems(obj, currentVersion, "obj", objMarkdownPath);


console.log("finished export");

function checkAndCreatePath(path){
    if(!fs.existsSync(path)){
        console.log("Creating folder", path);
        fs.mkdirSync(path);
    }
}

function renderFile(model, name, version, type, exportPath) {

    console.log("Rendering", name);

    var data = model.get(name, version);
    var opts = {};
    opts[type] = data;

    var filename = exportpath[type] + '/' + name + "." + extension;
    console.log("Writing", filename);

    ejs.renderFile(templates[type], opts, function(err, html){
        fs.writeFile(filename, html, function(err){
            if (err) throw err;
        });

    });
    return {data: data, opts: opts};
}


function renderItems(model, version, type, exportPath){
    var items = model.list(version);

    for(var i in items) {
        var name = items[i];
        renderFile(model, name, version, type, exportPath);

    }
}



