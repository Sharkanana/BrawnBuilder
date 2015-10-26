
(function() {

    var app = angular.module('brawnBuilder', []);

    app.controller('MainCtrl', function ($scope, $http) {

        var me = this;

        $scope.isLoading = true;

        $http.get('/initialLoad').success(function(response) {

            $scope.movements = response;
            $scope.isLoading = false;
        });
    });
})();