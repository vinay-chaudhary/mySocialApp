app.controller('MainAppController', ['$scope', '$http', '$state','userService', function($scope, $http, $state,userService) {


    $http.get('/api/getdata')
        .then(function(response){
                userService.setCookieData(response.data.user);
            console.log(response);
        },
        function(){

        })
}]);