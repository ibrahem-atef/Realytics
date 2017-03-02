angular.module("myApp").controller("c1", function($scope, JSONget){

    JSONget.GetAll("https://api.github.com/users", successHandler, failureHandler);

    function successHandler(response){
            $scope.myData = response.data;
    }

    function failureHandler(){
        console.log("An error has occured");
    }
})