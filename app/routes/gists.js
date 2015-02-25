module.exports = function(app){

    var index = require('../controllers/gist.controller');
    app.get("/gists", index.list);
};