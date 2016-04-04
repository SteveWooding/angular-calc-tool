/* JavaScript Document */

(function() {

  var app = angular.module('myCalculator', []);

  app.controller('CalculatorController', ['$scope', function($scope) {

    $scope.lumenOptions = [375, 600, 900, 1125, 1600];
    $scope.currentLumens = 600;
    $scope.currentCost = 12;
    $scope.currentHours = 3;
    $scope.totalDays = 365;

  }]);

})();


