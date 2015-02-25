module.exports = function(app){

    var gist = require('../controllers/gist.controller');
    app.get("/gists", gist.list);
    app.post("/gists/add", gist.add);
};