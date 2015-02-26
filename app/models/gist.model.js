var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var GistSchema = new Schema({
    gistid : String,
    name: String,
    type: String,
    version: String,
    createdAt: { type: Date, default: Date.now }
});

//Check for uniqueness


mongoose.model('GistExample', GistSchema);


GistSchema.index({ gistid: 1, name: 1, type: 1, version: 1 }, { unique: true });


GistSchema.pre('save', function(next){
    //Check if we have an instance model
    next();
});
