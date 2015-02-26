module.exports = function(app){

    var obj = require('../controllers/object.controller');

    app.get('/objects', obj.listObjects);
    app.get('/object/:type/:function', obj.getObject);
    app.get('/index.cfm/objects', obj.listObjects);
    app.get('/index.cfm/object/:type/:function', obj.getObject);

}

