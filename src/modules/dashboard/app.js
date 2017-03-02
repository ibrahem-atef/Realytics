angular.module("myApp", ["ngRoute"]);

angular.module("myApp").config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/", {templateUrl: "Views/one.html", controller: "c1"});
})