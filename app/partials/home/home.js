'use strict';

angular.module('app')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'partials/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.factory('HttpHome', ['$http', function($http) {
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
    },
    duplicate : function(file, title) {
      return $http.get('partials/home/home.php?m=duplicate&f='+file+'&t='+title).then(function (response) {
        return response.data;
      });
    },
    delete : function(file) {
      return $http.get('partials/home/home.php?m=delete&f='+file).then(function (response) {
        return response.data;
      });
    },
    save : function(file) {
      return $http.post('partials/home/home.php?m=save', JSON.stringify(file)).then(function (response) {
        return response.data;
      });
    }
  };
}])

.controller('HomeCtrl', ['$scope', '$window', '$modal', '$log', 'HttpHome', function($scope, $window, $modal, $log, HttpHome) {
  var home = this;
  home.files = [];

  HttpHome.all().then(function(data) {
    home.files = data;
  });

  home.modal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'ModalHome.html',
      controller: 'ModalHomeCtrl'
    });

    return modalInstance.result.then(function(title) {
      return title;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
      return false;
    });
  };

  home.create = function() {
    home.modal().then(function(title) {
      if (typeof title === 'string') {
        HttpHome.create(title).then(function(data) {
          if (data) {
            $window.location.href = '#/checklist';
          }
        });
      }
    });
  }

  home.use = function(file) {
    HttpHome.use(file).then(function(data) {
      if (data) {
        $window.location.href = '#/checklist';
      }
    });
  };

  home.duplicate = function(file) {
    home.modal().then(function(title) {
      if (typeof title === 'string') {
        HttpHome.duplicate(file, title).then(function(data) {
          if (data) {
            $window.location.href = '#/';
          }
        });
      }
    });
  };

  home.delete = function(file) {
    HttpHome.delete(file).then(function(data) {
      if (data) {
        $window.location.href = '#/';
      }
    });
  };

  home.save = function(idx) {
    HttpHome.save(home.files[idx]).then(function(data) {
      if (data) {
        $log.info('Salvou');
      }
    });
  };

}])

.controller('ModalHomeCtrl', function ($scope, $modalInstance) {

  $scope.modalitem = '';
  $scope.modalhelp = '';

  $scope.ok = function () {
    if ($scope.modalitem) {
      $modalInstance.close($scope.modalitem);
    } else {
      $scope.modalhelp = 'Favor inserir um nome!';
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
