
(function() {

    var app = angular.module('brawnBuilder', ['chart.js']);

    app.controller('MainCtrl', function ($scope, $http) {

        $scope.isLoading = true;

        $http.get('/initialLoad').success(function(response) {
            $scope.movements = response;
            $scope.isLoading = false;
        });
    });
})();