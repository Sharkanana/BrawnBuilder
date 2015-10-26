
var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
    date: Date,
    value: Number
});

var logSchema = mongoose.Schema({
    user: mongoose.Schema.ObjectId,
    movement: mongoose.Schema.ObjectId,
    entries: [entrySchema]
});

module.exports = mongoose.model('Log', logSchema);