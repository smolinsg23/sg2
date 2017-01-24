((function() {
  "use strict";

  angular.module("app").controller('stuffCtrl', function($scope, $http) {
    $scope.setup = function() {
      $http.get('api/v1/users/:id').then(function(response) {
        $scope. = response.data;
        $scope.orderAttribute = 'date';
        $scope.isOrderDescending = false;
      });
    };
    $scope.changeOrderAttribute = function(inputAttribute) {
      if (inputAttribute === $scope.orderAttribute) {
        $scope.isOrderDescending = !$scope.isOrderDescending;
      } else {
        $scope.isOrderDescending = false;
      }
      $scope.orderAttribute = inputAttribute;
    };
  });
});

$(function () {

    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=large-dataset.json&callback=?', function (data) {

        // Create a timer
        var start = +new Date();

        // Create the chart
        Highcharts.stockChart('container', {
            chart: {
                events: {
                    load: function () {
                        this.setTitle(null, {
                            text: 'Built chart in ' + (new Date() - start) + 'ms'
                        });
                    }
                },
                zoomType: 'x'
            },

            rangeSelector: {

                buttons: [{
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 3
            },

            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },

            title: {
                text: 'Hourly temperatures in Vik i Sogn, Norway, 2009-2015'
            },

            subtitle: {
                text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
            },

            series: [{
                name: 'Temperature',
                data: data.data,
                pointStart: data.pointStart,
                pointInterval: data.pointInterval,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: '°C'
                }
            }]

        });
    });
});