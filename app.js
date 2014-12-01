var app = require("express")();
var http = require('http').Server(app);
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')


var version = require('./version');
var tag = require('./tag');
var func = require('./function');

var fs = require('fs');

app.get('/api/version', version.current); //Get a specific version... this will have odd loopbacks. 
app.get('/api/versions', version.list);
app.get('/api/current', version.current);
app.get('/api/tags', tag.list);

app.get('/api/tag/:id', tag.get);
app.get('/api/functions', func.list);
app.get('/api/function/:id', func.get);

app.get('/versions', version.list);
app.get('/tags', tag.list);
app.get('/tag/:id', tag.get);
app.get('/functions', func.list);
app.get('/function/:id', func.get);




http.listen(3000,function(){
	console.log("listening on *:3000");
});