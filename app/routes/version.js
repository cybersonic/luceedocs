module.exports = function(app){

    var home = require('../controllers/home.controller');

    app.get('/', home.index);
    app.get('/index.cfm', home.index);
}

