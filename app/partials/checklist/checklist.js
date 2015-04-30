'use strict';

angular.module('myApp.checklist', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checklist', {
    templateUrl: 'partials/checklist/checklist.html',
    controller: 'CheckListCtrl'
  });
}])

.controller('CheckListCtrl', ['$scope', '$http', '$modal', '$log', function($scope, $http, $modal, $log) {
  var checklist = this;
  checklist.checklist = {
    'title' : checklist.title = '',
    'itens' : checklist.itens = []
  };

  var httpPost = function(n) {
    n = (n) ? true : false;
    $http.post('partials/checklist/checklist.php?m=save&n='+n, JSON.stringify(checklist.checklist)).error(function(status) {
      $log.info(status);
    });
  };
  var httpGet = function() {
    return $http.get('partials/checklist/checklist.php?m=get').success(function(response) {
      if (response) {
        checklist.title = response.title;
        checklist.itens = response.itens;
      }
    }).error(function(status) {
      $log.info(status);
    });
  };

  httpGet();

  checklist.open = function (type, idx) {
    var modalInstance = $modal.open({
      templateUrl: 'Modal.html',
      controller: 'ModalCtrl',
      resolve : {
        modaltitle : function() {
          if (type === 'add') {
            return 'Novo';
          } else if (type === 'edit') {
            return 'Editar';
          } else {
            return 'Salvar';
          }
        },
        modalholder : function() {
          if (type === 'add') {
            return 'Informe aqui o novo item!';
          } else if (type === 'edit') {
            return checklist.itens[idx].item;
          } else {
            return 'Informe o nome do arquivo!';
          }
        }
      }
    });

    modalInstance.result.then(function(item) {
      if (type === 'add') {
        checklist.addItem(item);
      } else if (type === 'edit') {
        checklist.addItem(item, idx);
      } else {
        checklist.saveList(item);
      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  checklist.saveList = function(item) {
    checklist.checklist.title = item;
    checklist.checklist.itens = checklist.itens;
    httpPost(true);
  };

  checklist.addItem = function(item, idx) {
    if (typeof idx !== 'undefined') {
      checklist.itens[idx].item = item;
    } else {
      checklist.itens.push({ item : item, done : false });
    }
    checklist.checklist.itens = checklist.itens;
    httpPost(false);
  };

  checklist.remaining = function() {
    var count = 0;
    angular.forEach(checklist.itens, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  checklist.archive = function() {
    var olditens = checklist.itens;
    checklist.itens = [];
    angular.forEach(olditens, function(item) {
      if (!item.done) checklist.itens.push(item);
    });
  };

  checklist.delete = function ( idx ) {
    var del = confirm("Deseja deletar esse item?");
    if (del) {
      checklist.itens.splice(idx, 1);
      httpPost();
    }
  };

  checklist.edit = function ( idx ) {
    checklist.open('edit', idx);
  };

  checklist.add = function () {
    checklist.open('add');
  };

  checklist.save = function () {
    checklist.open('save');
  };
}])

.controller('ModalCtrl', function ($scope, $modalInstance, modaltitle, modalholder) {

  $scope.modaltitle  = modaltitle;
  $scope.modalholder = modalholder;
  $scope.modalitem   = '';
  $scope.modalhelp   = '';

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
