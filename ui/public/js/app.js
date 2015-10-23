
(function() {

    var app = angular.module('brawnBuilder', []);

    app.controller('MainCtrl', function ($scope, $http) {

        var me = this;

        $http.get('/initialLoad').success(function(response) {
            console.log(response);
        });
    });
})();