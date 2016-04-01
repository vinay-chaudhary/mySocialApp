'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','userService', function($scope, $http, $state,userService) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {username: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
            userService.setCookieData(response.data.user);
            console.log(userService.getCookieData());
            $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Your Entries are not correct';
      });
    };
  }])
;