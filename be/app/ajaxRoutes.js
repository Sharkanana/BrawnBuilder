
/**
 * holds all ajax routes for the app
 * @param app
 */

var LogService = require('./service/logService')();

module.exports = function(app) {

    app.get('/initialLoad', function(req, res) {
        LogService.initialLoad(req._passport.session.user, res);
    });

    app.post('/addLog', function(req, res) {
        var reqData = req.body,
            userId = req._passport.session.user,
            movementId = reqData.movement,
            newEntry = {
                date: reqData.date,
                value: reqData.max
            };

        LogService.addLog(userId, movementId, newEntry, res);
    });
};