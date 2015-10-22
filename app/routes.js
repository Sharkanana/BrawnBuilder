
var User = require('./models/user');

module.exports = function(app) {

    //api routes go here

    //frontend routes, handles angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};