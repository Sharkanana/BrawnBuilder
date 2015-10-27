
(function() {

    var app = angular.module('brawnBuilder', ['chart.js']);

    app.controller('MainCtrl', function ($scope, $http) {

        $scope.isLoading = true;

        $scope.dates = [];
        $scope.weights = [];
        $scope.reps = [];

        $http.get('/initialLoad').success(function(response) {
            $scope.movements = response;
            $scope.isLoading = false;
        });

        $scope.calculateMax = function(movement) {

            var weight = $scope.weights[movement],
                reps = $scope.reps[movement];

            if(!weight || !reps)
                return '';

            return Math.round(weight * (1+(reps/30)));
        };
    });
})();