'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'ngClipboard',
  'xeditable'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
