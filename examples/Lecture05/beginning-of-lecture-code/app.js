(function () {
    'use strict';

    angular.module('myFirstApp', [])

        .controller('MyFirstController', function ($scope) {
            $scope.name = "foo";
            $scope.name1 = "bar"
        });

})();