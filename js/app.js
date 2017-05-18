angular.module("SnakesApp",["ngRoute","ngAnimate","Snakes.controllers"])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
   /*         .when("/player",{templateUrl: "player.html", controller:"playerController"})*/
            .when("/board", {templateUrl:"board.html", controller: "boardController"})
            .otherwise({redirectTo:"/board"});

        }]);


