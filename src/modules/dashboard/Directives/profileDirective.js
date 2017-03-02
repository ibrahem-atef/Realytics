angular.module("myApp").directive("profileDirective", function(){
    return {
        restrict: "AE",
        replace: true,
        templateUrl: "Directives/profileDirective.html",
        link: function(s, e, a){
            e.find("img").attr('src', a.imgUrl);
            //e.children(0)[0].src = a.imgUrl;
            //e.children(0)[1].innerText = a.userName;
            //e.children(0)[2].innerText = a.userType;
            e.find("#userName").text(a.userName);
            e.find("#type").text(a.userType);
            //console.log(e);
            globale = e;
            console.log(a.userName);
        }
    }
})