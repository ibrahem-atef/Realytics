angular.module("myApp").factory("JSONget", function($http){

    return {
        GetAll: function(url,s,e){
            $http.get(url).then(s).catch(e);
        }
    }
})