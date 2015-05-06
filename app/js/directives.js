'use strict';

angular.module("app")

.directive("mastFooter", function() {
  return {
    templateUrl: 'partials/components/mast-footer.html'
  };
})

.directive("mastHead", function() {
  return {
    templateUrl: 'partials/components/mast-head.html'
  };
});
