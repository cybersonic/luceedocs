module.exports = function(app){

    var tag = require('../controllers/tags.controller');

    app.get('/tags', tag.list);
    app.get('/tags/:filter', tag.list);
    app.get('/tags/:filter/:value', tag.list);
    app.get('/tag/:id', tag.get);
    app.get('/index.cfm/tags', tag.list);
    app.get('/index.cfm/tags/:filter', tag.list);
    app.get('/index.cfm/tags/:filter/:value', tag.list);
    app.get('/index.cfm/tag/:id', tag.get);
}

