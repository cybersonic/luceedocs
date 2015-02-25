var version = require("../../model/version.js");
var moment = require('moment');



 exports.list = function(req, res){

   var versions =version.fullList();
  if(isApi(req)) {
   res.json(versions);
  }
   res.render("version/list", {versions:versions, moment:moment});
 }

 exports.current = function(req, res){
	res.json(version.current());
 }

var isApi = function(req){

 var pathParts = req._parsedUrl.pathname.split(".");
 if(pathParts[pathParts.length-1].toLowerCase() == 'json') {
  return true;
 }
 return false;
};
