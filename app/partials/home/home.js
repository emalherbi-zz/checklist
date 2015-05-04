'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'partials/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.factory('service', ['$http', function($http) {
  return {
    all : function() {
      return $http.get('partials/home/home.php?m=all').then(function (response) {
        return response.data;
      });
    },
    create : function(name) {
      return $http.get('partials/home/home.php?m=create&f='+name).then(function (response) {
        return response.data;
      });
    },
    use : function(file) {
      return $http.get('partials/home/home.php?m=use&f='+file).then(function (response) {
        return response.data;
      });
    }
  };
}])

.controller('HomeCtrl', ['$scope', 'service', '$window', '$log', function($scope, service, $window, $log) {
  var home = this;
  home.files = [];

  service.all().then(function(data) {
    home.files = data;
  });

  home.create = function() {
    // falta fazer o modal, para perguntar o nome do arquivo.
    service.create('Cadastro Simples').then(function(data) {
      if (data) {
        $window.location.href = '#/checklist';
      }
    });
  };

  home.details = function(idx) {

  };

  home.use = function(file) {
    service.use(file).then(function(data) {
      $log.info(data);
    });
  };

}]);
