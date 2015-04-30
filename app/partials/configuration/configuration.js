'use strict';

angular.module('myApp.configuration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/configuration', {
    templateUrl: 'partials/configuration/configuration.html',
    controller: 'ConfigurationCtrl'
  });
}])

.controller('ConfigurationCtrl', [function() {

}]);
