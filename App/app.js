(function () {
    "use strict"
    var app = angular.module("flickrApp", ["ui.router"]);

    app.config(["$stateProvider", "$urlRouterProvider",
      function ($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise("/");
          $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "home/home.html",
                controller: "homeController",
                controllerAs: "homeController",
                authenticationReqired: false
            });
      }
    ]);
}());