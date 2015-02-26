module.exports = function(app){

    var search = require('../controllers/search.controller');
    app.get('/search/', search.find);
    app.get('/search/:term', search.find);
    app.get('/index.cfm/search/', search.find);
    app.get('/index.cfm/search/:term', search.find);

}

