angular.module("myApp").directive("chartDirective", function($http){
    return {
        restrict: "AE",
        replace: true,
        templateUrl: "Directives/chartDirective.html",
        link: function(s, e, a){
            var siteName = $("#"+a.siteName).text();
            if(siteName == "All Sites")
                siteName = "all";
            $.ajax({type: "GET", url: a.datatableUrl + siteName, headers:{authorization: Cookies.get('authorization')}}).done(function(jsonData){

                // Load the Visualization API and the corechart package.
                if(a.chartType == 'GeoChart')
                     google.charts.load('current', {'packages': ['geochart']});
                else
                {
                    google.charts.load('upcoming', {'packages':['corechart']});

                }


                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    globale = jsonData;
                    // console.log(jsonData);
                    var data = google.visualization.arrayToDataTable(jsonData , a.firstRowIsData === "true");

                    // console.log(a.chartType);

                    var width = e.parent().width();

                    // Set chart options
                    // console.log(a.mapColor);
                    var options = { 'title':a.titleData, 'width': width, 'height': a.heightData * width, backgroundColor: '#f8f8f8',  pieHole: a.pieHole, region: a.mapRegion, colorAxis: {colors: [a.mapFromColor, a.mapToColor]} , datalessRegionColor: a.datalessRegionColor};
                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization[a.chartType](e.get(0));
                    chart.draw(data, options);

                }

                var old_func = function(){};
                if(window.onresize)
                    old_func = window.onresize;

                window.onresize = function(){drawChart(); old_func()};

            });

        }
    }
})