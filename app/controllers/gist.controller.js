//module.exports = function(){
//
//}
var example = require('../models/gist.model.js');
var GistExample = require('mongoose').model('GistExample');



exports.list = function(req, res, next){

    GistExample.find({}, function(err, gists){
        if(err){
            return next(err);
        }
        else{
            res.json(gists);
        }
    });

};
exports.add = function(req, res, next){

        
}