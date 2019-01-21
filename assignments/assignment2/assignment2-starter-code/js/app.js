(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getToBuyItems();

    buyList.boughtItem = function (itemIndex) {
      ShoppingListCheckOffService.boughtItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var buyItems = [{
        quantity: 1,
        name: "foo1"
      },
      {
        quantity: 2,
        name: "foo2"
      },
      {
        quantity: 3,
        name: "foo3"
      },
      {
        quantity: 4,
        name: "foo4"
      },
      {
        quantity: 5,
        name: "foo5"
      }
    ];
    var boughtItems = [];

    service.boughtItem = function (itemIndex) {
      var itemArray = buyItems.splice(itemIndex, 1);
      boughtItems.push(itemArray[0]);
    };

    service.getToBuyItems = function () {
      return buyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

})();