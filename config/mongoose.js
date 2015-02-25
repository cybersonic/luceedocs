var config = require('./config');
    mongoose = require('mongoose');

module.exports = function(){
    var db = monguse.connect(config.db);

    reequire("../models/example.model.js");
    return db;

}