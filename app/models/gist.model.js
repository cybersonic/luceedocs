var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var GistSchema = new Schema({
    gistid : String,
    name: String,
    type: String,
    version: String,
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('GistExample', GistSchema);