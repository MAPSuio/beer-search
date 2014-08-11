var angular = require('angular');
require('angular-bootstrap');

var BeerSearch = angular.module('BeerSearch', [
    'ui.bootstrap'
]).controller('BeerController', function ($scope) {
    function makeCans(hiWeight, loWeight, numCans) {
        function getLetter(i) {
            var code = "a".charCodeAt(0) + i;
            return String.fromCharCode(code).toUpperCase();
        }

        var cans = [];

        for (var i = 0; i < numCans; ++i) {
            cans.push({
                weight: hiWeight,
                label: getLetter(i),
                selected: false
            });
        }

        var loCanIdx = Math.floor(Math.random()*numCans);
        var loCan = cans[loCanIdx];

        loCan.weight = loWeight;

        return cans;
    }

    var hiWeight = 500;
    var loWeight = 450;
    var numCans = 8;

    $scope.cans = makeCans(hiWeight, loWeight, numCans);

    $scope.weighs = [];
    $scope.weigh = function () {
        var selectedCans = [];

        for (var idx in $scope.cans) {
            var can = $scope.cans[idx];

            if (can.selected) {
                selectedCans.push(can);
            }
        }

        $scope.weighs.push(selectedCans)
    };
}).filter('canSumLabel', function() {
  return function(cans) {
      var canLabels = [];

      for (var idx in cans) {
          var can = cans[idx];

          if (!can || !can.label) {
              continue;
          }

          canLabels.push(can.label);
      }

      return canLabels.join(' + ') + ' =';
  };
}).filter('totalWeight', function() {
  return function(cans) {
      var weight = 0;

      for (var idx in cans) {
          var can = cans[idx];

          if (!can || !can.weight) {
              continue;
          }

          weight += can.weight;
      }

      return weight + 'g';
  };
});
