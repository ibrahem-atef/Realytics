angular.module("myApp", ["ngRoute"]);

angular.module("myApp").config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/", {templateUrl: "Views/view1.html", controller: "c1"});
})