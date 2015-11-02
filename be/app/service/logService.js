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
            var me = this;

            Log.find({user: userId}).populate('user movement').exec(function(err, logs) {

                Movement.find({}).exec(function(err, movements) {
                    var data = [];

                    //looping movements
                    for(var i = 0; i < movements.length; i++) {
                        var movement = movements[i],
                            entriesForUI = {};

                        //look through logs to find data points and labels
                        for(var j = 0; j < logs.length; j++) {
                            var log = logs[j];

                            //proper movement found
                            if(log.movement.id === movement.id)
                                entriesForUI = me.entriesForUI(log.entries);
                        }

                        data.push({
                            id: movement._id,
                            name: movement.name,
                            icon: movement.icon,
                            labels: entriesForUI.labels,
                            series: [''],
                            data: [entriesForUI.data]
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

            var me = this,
                saveHandler = function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send(false);
                    }
                    else {
                        res.send(me.entriesForUI(result.entries));
                    }
                };

            //lookup log for user/movement
            Log.findOne({
                user: userId,
                movement: movementId
            }).exec(function (err, log) {
                //if found, insert new Entry
                if (log) {

                    //update if entry already exists for date
                    var updated = false;
                    for(var i = 0; i < log.entries.length; i++) {
                        if(log.entries[i].date === newEntry.date) {
                            log.entries[i].value = newEntry.value;
                            updated = true;
                            break;
                        }
                    }

                    //otherwise add new entry
                    if(!updated)
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
        },

        /**private functions**/
        entriesForUI: function(entries) {
            var result = {
                data: [],
                labels: []
            };

            entries.sort(function(a,b) {
                return new Date(a.date) - new Date(b.date);
            });

            for(var k = 0; k < entries.length; k++) {
                var entry = entries[k];

                result.data.push(entry.value);
                result.labels.push(entry.date.substring(0, 10));
            }

            return result;
        }
    }
};