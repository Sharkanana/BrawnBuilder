
(function() {

    var app = angular.module('brawnBuilder', ['chart.js']);

    app.controller('MainCtrl', function ($scope, $http, $filter) {

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
                    mObject.data[0].push(data.max);
                    mObject.labels.push($filter('date')(data.date, 'MM/dd/yyyy'));
                }
                else {
                    alert('Error adding log!');
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
            if(scope.movements[i].name === movement)
                return scope.movements[i];
        }

        return null;
    }
})();