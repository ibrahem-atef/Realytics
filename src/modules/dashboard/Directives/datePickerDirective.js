angular.module("myApp").directive("datePickerDirective", function(){
    return {
        restrict: "AE",
        replace: true,
        templateUrl: "Directives/datePickerDirective.html",
        link: function(s,e,a){
            globale = e;
            e.find('#datePickerID').datepicker();
        }
    }
})