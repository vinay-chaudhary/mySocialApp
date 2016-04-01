app.controller('SignoutFormController', ['$scope', '$http', '$state','userService', function($scope, $http, $state,userService) {


    $scope.username=userService.getCookieData().name;
    $scope.logout = function() {
        // Try to logout
        //userService.clearCookieData();
        // //$state.go('access.signin');



        $http.get('api/logout')
            .then(function(response) {

                    userService.clearCookieData();
                    $state.go('access.signin');
            }
            , function(x) {
                console.log("Not logout");
            });
    };
}]);