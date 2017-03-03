angular.module("myApp").controller("c1", function($scope, JSONget){

    JSONget.GetAll("http://localhost:7777/site_data", successHandler, failureHandler);

    function successHandler(response){
            $scope.myData = response.data;
    }

    function failureHandler(){
        console.log("An error has occured");
    }
})