
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
            console.log(movement);
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
})();