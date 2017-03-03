angular.module("myApp").directive("blockDirective", function(){
    return {
        restrict: "AE",
        replace: false,
        templateUrl: "Directives/blockDirective.html",
        link: function(s, e, a){
            e.find("#spanBlockDirective").text(a.spanData);
            e.find("#titleBlockDirective").text(a.titleData);
            e.find("#contentBlockDirective").text(a.contentData);
            e.find("#smallBlockDirective").text(a.smallData);
            e.find("#spanBlockDirective").css("background-color", a.colorData);
        }
    }
})