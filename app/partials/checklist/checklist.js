'use strict';

angular.module('app')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checklist', {
    templateUrl: 'partials/checklist/checklist.html',
    controller: 'ChecklistCtrl'
  });
}])

.factory('HttpChecklist', ['$http', function($http) {
  return {
    all : function() {
      return $http.get('partials/checklist/checklist.php?m=all').then(function (response) {
        return response.data;
      });
    },
    save : function(files) {
      return $http.post('partials/checklist/checklist.php?m=save', JSON.stringify(files)).then(function (response) {
        return response.data;
      });
    }
  };
}])

.controller('ChecklistCtrl', ['$scope', '$modal', '$log', 'HttpChecklist', function($scope, $modal, $log, HttpChecklist) {
  var checklist = this;
  checklist.files = {};
  checklist.msg   = '';

  HttpChecklist.all().then(function(data) {
    checklist.files = data;
  });

  var commit = function() {
    HttpChecklist.save(checklist.files).then(function(data) {
      $log.info(data);
    });
  };

  checklist.modal = function (type, idx) {
    var modalInstance = $modal.open({
      templateUrl: 'ModalChecklist.html',
      controller: 'ModalChecklistCtrl'
    });

    modalInstance.result.then(function(item) {
      checklist.addItem(item);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  checklist.addItem = function(item, idx) {
    if (typeof idx !== 'undefined') {
      checklist.files[0].contents.itens[idx].item = item;
    } else {
      checklist.files[0].contents.itens.push({ item : item, done : false });
    }
    commit();
  };

  checklist.delete = function ( idx ) {
    checklist.files[0].contents.itens.splice(idx, 1);
    commit();
  };

  checklist.edit = function (idx) {
    checklist.addItem(checklist.files[0].contents.itens[idx].item, idx);
  };

  checklist.add = function () {
    checklist.modal('add');
  };

  checklist.done = function () {
    commit();
  };

  checklist.remaining = function() {
    var count = 0;
    angular.forEach(checklist.files[0].contents.itens, function(itens) {
      count += itens.done ? 0 : 1;
    });
    return count;
  };

  checklist.copy = function() {
    var str = '';
    var ct  = 1;

    str += checklist.msg + "\n\n";
    angular.forEach(checklist.files[0].contents.itens, function(itens) {
      if (!itens.done) {
        str += ct + ". " + itens.item + "\n";
        ct++;
      }
    });
    return str;
  };

}])

.controller('ModalChecklistCtrl', function ($scope, $modalInstance) {

  $scope.item = '';
  $scope.help = '';

  $scope.ok = function () {
    if ($scope.item) {
      $modalInstance.close($scope.item);
    } else {
      $scope.help = 'Favor inserir um nome!';
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

})

.config(['ngClipProvider', function(ngClipProvider) {
  ngClipProvider.setPath("lib/zeroclipboard/swf/ZeroClipboard.swf");
}]);
