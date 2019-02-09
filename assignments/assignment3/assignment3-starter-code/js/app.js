(function () {
    "use strict";

    angular
        .module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", MenuSearchDirective)
        .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

    function MenuSearchDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: MenuSearchDirectiveController,
            controllerAs: "menu",
            bindToController: true
        };
        return ddo;
    }

    function MenuSearchDirectiveController() {
        var list = this;
        list.notFound = function () {
            console.log(list.foundItems);
            console.log(list.foundItems.length);

            return list.foundItems == 0;
        };
    }

    NarrowItDownController.$inject = ["MenuSearchService"];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";
        menu.found = [];

        menu.getMatchedMenuItems = function (searchTerm) {
            if (searchTerm == "") {
                menu.found = [];
                return;
            }
            menu.searchTerm = searchTerm.toLowerCase();

            console.log("in menu.getMatchedMenuItems(" + menu.searchTerm + ")");
            MenuSearchService
                .getMatchedMenuItems(menu.searchTerm)
                .then(function (response) {
                    menu.found = response.data;
                    console.log(menu.found);
                })
                .catch(function (error) {
                    console.log(error);
                });

        };

        menu.removeItem = function (index) {
            console.log("removeItem " + index);
            console.log(menu.found);
            menu
                .found
                .splice(index, 1);
            console.log(menu.found);
        };
    }
    MenuSearchService.$inject = ["$http", "ApiBasePath"];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var promise = service.getMenuItems();
            promise.then(function (response) {
                    console.log(response.data);
                    var data = response.data.menu_items;
                    console.log(data);
                    service.found = [];

                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        // console.log(item);
                        if (item.description.toLowerCase().includes(searchTerm)) {
                            // data.splice(i, 1);
                            console.log(i);
                            console.log(item);
                            service
                                .found
                                .push(item);
                        }
                    }
                    console.log(service.found);
                    response.data = service.found;
                })
                .catch(function (error) {
                    console.log(error);
                });
            return promise;
        };

        service.getMenuItems = function () {
            var response = $http({
                method: 'GET',
                url: ApiBasePath + "/menu_items.json"
            });
            return response;
        };
    }

})();