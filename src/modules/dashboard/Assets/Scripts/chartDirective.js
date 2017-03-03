angular.module("myApp").directive("chartDirective", function($http){
    return {
        restrict: "AE",
        replace: false,
        templateUrl: "Directives/chartDirective.html",
        link: function(s, e, a){
            // Load the Visualization API and the corechart package.
            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                $http.get(a.datatableUrl).then(function(jsonData){
                    globale = a;
                    var data = google.visualization.arrayToDataTable(jsonData.data , a.firstRowIsData === "true");

                    function DrawChart(){
                        var width = e.parent().width();

                        // Set chart options
                        var options = { 'title':a.titleData, 'width': width, 'height': a.heightData * width, backgroundColor: '#f8f8f8',  pieHole: a.pieHole};

                        // Instantiate and draw our chart, passing in some options.
                        var chart = new google.visualization[a.chartType](e.get(0));
                        chart.draw(data, options);
                    }
                    
                    DrawChart();

                    window.onresize = DrawChart;

                });

            }

        }
    }
})