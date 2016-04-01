'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state','userService', function($scope, $http, $state,userService) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
      $http.post('api/signup', {name: $scope.user.name, username: $scope.user.email, password: $scope.user.password,dob:$scope.user.dob,number:$scope.user.number})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = response;
        }else{
            userService.setCookieData(response.data.user);
            $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
 ;