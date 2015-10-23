
var mongoose = require('mongoose');

var movementSchema = mongoose.Schema({
    name: String,
    icon: String
});

module.exports = mongoose.model('Movement', movementSchema);