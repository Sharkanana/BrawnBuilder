
var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    movement: { type: mongoose.Schema.ObjectId, ref: 'Movement' },
    entries: []
});

module.exports = mongoose.model('Log', logSchema);