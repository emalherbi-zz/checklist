'use strict';

angular.module('myApp.anteriores', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/anteriores', {
    templateUrl: 'partials/anteriores/anteriores.html',
    controller: 'AnterioresCtrl'
  });
}])

.controller('AnterioresCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
  var anteriores = this;
  anteriores.files = [];

  var httpGet = function() {
    return $http.get('partials/anteriores/anteriores.php?m=get').success(function(response) {
      anteriores.files = response;
    }).error(function(status) {
      $log.info(status);
    });
  };
  httpGet();

  anteriores.details = function(idx) {
  //  $scope.table-details-idx.ng-hide = true;
  }

}]);
