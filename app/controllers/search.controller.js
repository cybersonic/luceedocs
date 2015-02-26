/**
 * Created by markdrew on 07/12/14.
 */
var search = require('../../model/search.js');

exports.find  = function(req, res){

     var term = req.query.term ? req.query.term : "";
    res.json(search.find(term));
}
