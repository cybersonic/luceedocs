//module.exports = function(){
//
//}
var example = require('../models/gist.model.js');
var GistExample = require('mongoose').model('GistExample');
var Gisty = require('gisty');


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

        var gist = new GistExample(req.body);



        gist.save(function(err){

                if(err){
                    res.json({error:"Gist already exists", status:"fail"});
                    next(err);
                }
            else{
                    res.json({status:"ok"})
                }

        });

       // res.json("hello");

}




exports.check = function(req, res, next){

        console.log(gist);

    res.json(gist);
}

exports.success = function(res, req, next){
    res.render('gist/success')
}