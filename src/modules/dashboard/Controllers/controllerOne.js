angular.module("myApp").controller("c1", function($scope, JSONget){
    $scope.viewName = "view one";

    $scope.ShowInfo = function(data){
        a = data;
        $scope.selected = data;
    }

    JSONget.GetAll("https://api.github.com/users", successHandler, failureHandler);

    function successHandler(response){
            $scope.myData = response.data;
            console.log(response.data);
    }

    function failureHandler(){
        console.log("An error has occured");
    }
})