module.exports = function(app){

    var home = require('../controllers/home.controller');

    app.get('/home', home.index);
    app.use(home.before);

}

