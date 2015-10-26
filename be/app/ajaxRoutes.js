
/**
 * holds all ajax routes for the app
 * @param app
 */

var Movement = require('../app/models/movement');

module.exports = function(app) {

    app.get('/initialLoad', function(req, res) {
        //loop all movements
        Movement.find({}).exec(function(err, movements) {
            res.json(movements);
        });
    });
};