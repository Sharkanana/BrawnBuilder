
(function() {

    var app = angular.module('brawnBuilder', ['chart.js']);

    app.controller('MainCtrl', function ($scope, $http) {

        $scope.isLoading = true;

        $scope.dates = {};
        $scope.weights = {};
        $scope.reps = {};

        $http.get('/initialLoad').success(function(response) {
            $scope.movements = response;

            for(var i = 0; i < response.length; i++) {
                var movement = response[i];

                $scope.dates[movement.name] = new Date();
            }

            $scope.isLoading = false;
        });

        $scope.addLog = function(movement) {
            var mObject = findMovement($scope, movement),
                data = {
                    movement: mObject.id,
                    max: $scope.calculateMax(movement),
                    date: $scope.dates[movement]
                };

            $http.post('addLog', data).success(function(response) {
                if(response) {
                    mObject.data[0] = response.data;
                    mObject.labels = response.labels;
                }
                else {
                    alert('Error adding log!');
                }
            });
        };

        $scope.deletePoint = function(points, evt) {
            var point = points[0],
                movementId = evt.currentTarget.id.substring(5);

            $http.post('deleteLog', {
                movement: movementId,
                date: point.label,
                value: point.value
            }).success(function(response) {
                if(response) {
                    var mObj = findMovement($scope, movementId);

                    mObj.data[0] = response.data;
                    mObj.labels = response.labels;
                }
                else {
                    alert('Error deleting log!');
                }
            });
        };

        $scope.canAdd = function(movement) {
            return $scope.dates[movement] && $scope.weights[movement] && $scope.reps[movement];
        };

        $scope.calculateMax = function(movement) {

            var weight = $scope.weights[movement],
                reps = $scope.reps[movement];

            if(!weight || !reps)
                return '';

            return Math.round(weight * (1+(reps/30)));
        };
    });

    function findMovement(scope, movement) {
        for(var i = 0; i < scope.movements.length; i++) {
            if(scope.movements[i].name === movement || scope.movements[i].id === movement)
                return scope.movements[i];
        }

        return null;
    }
})();