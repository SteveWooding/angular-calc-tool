/* JavaScript Document */

(function() {

  var app = angular.module('myCalculator', []);

  app.controller('CalculatorController', ['$scope', function($scope) {

    $scope.lumenOptions = [375, 600, 900, 1125, 1600];
    $scope.currentLumens = 600;
    $scope.currentCost = 12;
    $scope.currentHours = 3;
    $scope.totalDays = 365;

    $scope.incConversion = 0.0625;
    $scope.halConversion = 0.0450;
    $scope.cflConversion = 0.0146;
    $scope.ledConversion = 0.0125;

  }]);

})();


