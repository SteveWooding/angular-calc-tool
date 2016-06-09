/* JavaScript Document */

(function() {

  var app = angular.module('myCalculator', []);

  app.controller('CalculatorController', ['$scope', function($scope) {

    // Set default values and options
    $scope.lumenOptions = [210, 420, 630, 1050, 1600];
    $scope.currentLumens = 630;
    $scope.currentCost = 12;
    $scope.currentHours = 3;
    var totalDays = 365;

    // Define the approximate conversion parameter for each bulb type.
    var incConversion = 0.0952;
    var halConversion = 0.0710;
    var cflConversion = 0.0181;
    var ledConversion = 0.0100;

    // Store the lifetimes of each bulb
    $scope.incLife = 1000;
    $scope.halLife = 2000;
    $scope.cflLife = 10000;
    $scope.ledLife = 35000;

    // Store the replacement cost of each bulb
    var incBulbCost = 0.63;
    var halBulbCost = 1.40;
    var cflBulbCost = 2.00;
    var ledBulbCost = 3.20;

    /**
     * Calculate the wattage and cost of each bulb type.
     */
    $scope.calculate = function() {
      // Calculate the wattage of each bulb type.
      $scope.incWattage = ($scope.currentLumens * incConversion).toFixed(1);
      $scope.halWattage = ($scope.currentLumens * halConversion).toFixed(1);
      $scope.cflWattage = ($scope.currentLumens * cflConversion).toFixed(1);
      $scope.ledWattage = ($scope.currentLumens * ledConversion).toFixed(1);

      // Put a limit of 24 hours in a day.
      if ($scope.currentHours > 24) {
        $scope.currentHours = 24;
      }

      // Calculate the total number of hours of bulb use per year.
      var totalHours = totalDays * $scope.currentHours;

      // Convert pence per kWh into pounds
      var cost = $scope.currentCost / 100;

      // Calculate the cost of each bulb type.
      $scope.incCost = ((($scope.incWattage * totalHours) / 1000) * cost).toFixed(2);
      $scope.halCost = ((($scope.halWattage * totalHours) / 1000) * cost).toFixed(2);
      $scope.cflCost = ((($scope.cflWattage * totalHours) / 1000) * cost).toFixed(2);
      $scope.ledCost = ((($scope.ledWattage * totalHours) / 1000) * cost).toFixed(2);

      // Calculate the 10 year cost, with bulb replacement.
      $scope.inc10yCost = (10 * $scope.incCost + incBulbCost *
        Math.ceil(totalHours * 10 / $scope.incLife)).toFixed(2);
      $scope.hal10yCost = (10 * $scope.halCost + halBulbCost *
        Math.ceil(totalHours * 10 / $scope.halLife)).toFixed(2);
      $scope.cfl10yCost = (10 * $scope.cflCost + cflBulbCost *
        Math.ceil(totalHours * 10 / $scope.cflLife)).toFixed(2);
      $scope.led10yCost = (10 * $scope.ledCost + ledBulbCost *
        Math.ceil(totalHours * 10 / $scope.ledLife)).toFixed(2);
    }

    // Run the calculation the first time the page is loaded.
    $scope.calculate();

  }]);

})();
