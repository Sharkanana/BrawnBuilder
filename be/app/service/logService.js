/**
 * Backend service functions for logs
 */
var Movement = require('../models/movement'),
    Log = require('../models/log');

module.exports = function() {
    return {

        /**
         * loads the logs and movements for the logged in user
         * @param userId
         * @param res
         */
        initialLoad: function(userId, res) {
            Log.find({user: userId}).populate('user movement').exec(function(err, logs) {

                Movement.find({}).exec(function(err, movements) {
                    var data = [];

                    //looping movements
                    for(var i = 0; i < movements.length; i++) {
                        var movement = movements[i],
                            entryData = [],
                            labelData = [];

                        //look through logs to find data points and labels
                        for(var j = 0; j < logs.length; j++) {
                            var log = logs[j];

                            //proper movement found
                            if(log.movement.id === movement.id) {
                                //sort by date
                                var entries = log.entries.sort(function(a,b) {
                                    return new Date(a.date) - new Date(b.date);
                                });

                                for(var k = 0; k < entries.length; k++) {
                                    var entry = entries[k];

                                    entryData.push(entry.value);
                                    labelData.push(entry.date.substring(0, 10));
                                }
                            }
                        }

                        data.push({
                            id: movement._id,
                            name: movement.name,
                            icon: movement.icon,
                            labels: labelData,
                            series: [''],
                            data: [entryData]
                        });
                    }

                    res.send(data);
                });
            });
        },

        /**
         * adds an entry to a user's movement log
         *
         * @param userId
         * @param movementId
         * @param newEntry
         * @param res
         */
        addLog: function(userId, movementId, newEntry, res) {

            var saveHandler = function (err) {
                if (err)
                    console.log(err);
                res.send(!err);
            };

            //lookup log for user/movement
            Log.findOne({
                user: userId,
                movement: movementId
            }).exec(function (err, log) {
                //if found, insert new Entry
                if (log) {
                    log.entries.push(newEntry);
                    log.save(saveHandler)
                }
                //else, insert new Log, along with new entry
                else {
                    new Log({
                        user: userId,
                        movement: movementId,
                        entries: [newEntry]
                    }).save(saveHandler);
                }
            });
        }
    }
};