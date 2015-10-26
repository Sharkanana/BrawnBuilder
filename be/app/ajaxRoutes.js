
/**
 * holds all ajax routes for the app
 * @param app
 */

var Movement = require('../app/models/movement'),
    Log = require('../app/models/log');

module.exports = function(app) {

    app.get('/initialLoad', function(req, res) {
        Log.find({user: Movement.db.base.Schema.ObjectId(req._passport.session.user)}).exec(function(err, logs) {

            Movement.find({}).exec(function(err, movements) {
                var data = [];

                for(var i = 0; i < movements.length; i++) {
                    var movement = movements[i];

                    //todo: look through logs to find data points and labels

                    data.push({
                        name: movement.name,
                        icon: movement.icon,
                        labels: ['Jan 2011', '', '', '', '', '', 'Oct 2015'],
                        series: [''],
                        data: [[10, 20, 30, 35, 50, 60, 70]]
                    });
                }

                res.send(data);
            });
        });
    });
};