angular.module('ualib')

.controller('ModalDemoCtrl', function ($scope, $modal) {

  $scope.openModal = function () {
    $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl'
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('ualib').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
