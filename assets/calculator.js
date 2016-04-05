/* JavaScript Document */

(function() {

  var app = angular.module('myCalculator', []);

  app.controller('CalculatorController', ['$scope', function($scope) {

    // Set default values and options
    $scope.lumenOptions = [375, 600, 900, 1125, 1600];
    $scope.currentLumens = 600;
    $scope.currentCost = 12;
    $scope.currentHours = 3;
    var totalDays = 365;

    // Define the approximate conversion parameter for each bulb type.
    var incConversion = 0.0625;
    var halConversion = 0.0450;
    var cflConversion = 0.0146;
    var ledConversion = 0.0125;

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
    }

    // Run the calculation the first time the page is loaded.
    $scope.calculate();

  }]);

})();
