var express = require('express');

module.exports = function(){

    var app = express();
    require('../app/routes/gists')(app);
    require('../app/routes/gists')(app);

    return app;
}