module.exports = function(app){

    var func = require('../controllers/functions.controller');

    app.get('/functions', func.list);
    app.get('/functions/:filter', func.list);
    app.get('/function/:id', func.get);
    app.get('/index.cfm/functions/:filter', func.list);
    app.get('/index.cfm/functions', func.list);
    app.get('/index.cfm/function/:id', func.get);

}

