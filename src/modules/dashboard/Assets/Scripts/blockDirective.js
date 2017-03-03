angular.module("myApp").directive("blockDirective", function(){
    console.log("directive");
    return {
        restrict: "AE",
        replace: false,
        templateUrl: "Directives/blockDirective.html",
        link: function(s, e, a){
            e.find("#spanBlockDirective").text(a.spanData);
            e.find("#titleBlockDirective").text(a.titleData);
            e.find("#contentBlockDirective").text(a.contentData);
            e.find("#smallBlockDirective").text(a.smallData);
            globale = e;
            console.log(a.spanData);
        }
    }
})