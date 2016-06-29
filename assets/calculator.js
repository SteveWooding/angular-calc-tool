/* JavaScript Document */

(function() {

  var app = angular.module('myCalculator', []);

  app.controller('CalculatorController', function() {

    // Capture the controller context in a view model variable
    var vm = this;

    // Set default values and options
    vm.lumenOptions = [210, 420, 630, 1050, 1600];
    vm.currentLumens = 630;
    vm.currentCost = 12;
    vm.currentHours = 3;
    var totalDays = 365;

    // Define the approximate conversion parameter for each bulb type.
    var incConversion = 0.0952;
    var halConversion = 0.0710;
    var cflConversion = 0.0181;
    var ledConversion = 0.0100;

    // Store the lifetimes of each bulb
    vm.incLife = 1000;
    vm.halLife = 2000;
    vm.cflLife = 10000;
    vm.ledLife = 35000;

    // Store the replacement cost of each bulb
    var incBulbCost = 0.63;
    var halBulbCost = 1.40;
    var cflBulbCost = 2.00;
    var ledBulbCost = 3.20;

    /**
     * Calculate the wattage and cost of each bulb type.
     */
    vm.calculate = function() {
      // Calculate the wattage of each bulb type.
      vm.incWattage = (vm.currentLumens * incConversion).toFixed(1);
      vm.halWattage = (vm.currentLumens * halConversion).toFixed(1);
      vm.cflWattage = (vm.currentLumens * cflConversion).toFixed(1);
      vm.ledWattage = (vm.currentLumens * ledConversion).toFixed(1);

      // Put a limit of 24 hours in a day.
      if (vm.currentHours > 24) {
        vm.currentHours = 24;
      }

      // Calculate the total number of hours of bulb use per year.
      var totalHours = totalDays * vm.currentHours;

      // Convert pence per kWh into pounds
      var cost = vm.currentCost / 100;

      // Calculate the cost of each bulb type.
      vm.incCost = (((vm.incWattage * totalHours) / 1000) * cost).toFixed(2);
      vm.halCost = (((vm.halWattage * totalHours) / 1000) * cost).toFixed(2);
      vm.cflCost = (((vm.cflWattage * totalHours) / 1000) * cost).toFixed(2);
      vm.ledCost = (((vm.ledWattage * totalHours) / 1000) * cost).toFixed(2);

      // Calculate the 10 year cost, with bulb replacement.
      vm.inc10yCost = (10 * vm.incCost + incBulbCost *
        Math.ceil(totalHours * 10 / vm.incLife)).toFixed(2);
      vm.hal10yCost = (10 * vm.halCost + halBulbCost *
        Math.ceil(totalHours * 10 / vm.halLife)).toFixed(2);
      vm.cfl10yCost = (10 * vm.cflCost + cflBulbCost *
        Math.ceil(totalHours * 10 / vm.cflLife)).toFixed(2);
      vm.led10yCost = (10 * vm.ledCost + ledBulbCost *
        Math.ceil(totalHours * 10 / vm.ledLife)).toFixed(2);
    };

    // Run the calculation the first time the page is loaded.
    vm.calculate();

  });

})();
