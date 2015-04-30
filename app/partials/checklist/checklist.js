'use strict';

angular.module('myApp.checklist', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checklist', {
    templateUrl: 'partials/checklist/checklist.html',
    controller: 'CheckListCtrl'
  });
}])

.controller('CheckListCtrl', ['$scope', '$http', '$modal', '$log', function($scope, $http, $modal, $log) {
  var todoList = this;
  todoList.todos = [];

  var httpPost = function() {
    $http.post('checklist.php?m=save', JSON.stringify(todoList.todos)).error(function(status) {
      // console.log(status);
    });
  };
  var httpServer = function() {
    return $http.get('checklist.php?m=get').success(function(response) {
      todoList.todos = response;
    }).error(function(status) {
      // console.log(status);
    });
    // return $http.get('storage.txt').success(function(response) {
    //   todoList.todos = response;
    // }).error(function(status) {
    //   // console.log(status);
    // });
  };

  httpServer();

  todoList.open = function (idx) {
    var modalInstance = $modal.open({
      templateUrl: 'myModal.html',
      controller: 'ModalCtrl'
    });

    modalInstance.result.then(function (item) {
      todoList.addItem(idx, item);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  todoList.addItem = function(idx, item) {
    if (idx) {
      todoList.todos[idx].text = item;
    } else {
      todoList.todos.push({ text:item, done:false });
    }

    httpPost();
  };

  todoList.remaining = function() {
    var count = 0;
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  todoList.archive = function() {
    var oldTodos = todoList.todos;
    todoList.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) todoList.todos.push(todo);
    });
  };

  todoList.delete = function ( idx ) {
    var rusure = confirm("Are you sure you want to remove the task from the list?" + idx);
    if(rusure) {
      todoList.todos.splice(idx, 1);
      httpPost();
    }
  };

  todoList.edit = function ( idx ) {
    todoList.open(idx);
  };

  todoList.add = function () {
    todoList.open();
  };

}])

.controller('ModalCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
