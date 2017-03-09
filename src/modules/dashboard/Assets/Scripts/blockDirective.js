angular.module("myApp").directive("blockDirective", function(){
    return {
        restrict: "AE",
        replace: false,
        templateUrl: "Directives/blockDirective.html",
        link: function(s, e, a){
            var siteName = $("#"+a.siteName).text();
            if(siteName == "All Sites")
                siteName = "all";
            e.find("#spanBlockDirective").text(a.spanData);
            e.find("#titleBlockDirective").text(a.titleData);
            e.find("#smallBlockDirective").text(a.smallData);
            e.find("#spanBlockDirective").css("background-color", a.colorData);
            $.ajax({type: "GET", url: a.apiUrl + siteName, headers:{authorization: Cookies.get('authorization')}}).done( function(data, status){
                e.find("#contentBlockDirective").text(data);
            });
        }
    }
})