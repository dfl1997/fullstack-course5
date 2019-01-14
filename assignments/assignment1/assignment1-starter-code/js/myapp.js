(function () {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', MyFunc);

    MyFunc.$inject = ['$scope'];

    function MyFunc($scope) {
        $scope.items = "";
        $scope.msg = "";
        $scope.count = function () {
            //console.log("count() called");
            //console.log("input: " + $scope.items);

            var arItems = $scope.items.split(",");
            var len = arItems.length;
            //console.log("length: " + len);
            if (!$scope.items) {
                $scope.msg = "Please enter data first";
            } else if (len <= 3) {
                $scope.msg = "Enjoy!";
            } else {
                $scope.msg = "Too much!";
            }
        }
    }

})();