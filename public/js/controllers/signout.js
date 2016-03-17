app.controller('SignoutFormController', ['$scope', '$http', '$state','userService', function($scope, $http, $state,userService) {
    $scope.logout = function() {
        // Try to logout
        userService.clearCookieData();
        $state.go('access.signin');
        //console.log('try logout');
        //$http.get('/logout')
        //    .then(function(response) {
        //
        //            userService.clearCookieData();
        //            $state.go('access.signin');
        //    }
        //    , function(x) {
        //        console.log("Not logout");
        //    });
    };
}]);