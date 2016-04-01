app.controller('ProfileController', function($scope,$http,userService) {
    $scope.username=userService.getCookieData().name;
    $scope.currentPost=null;
    $scope.showComment=function(id){
        return ($scope.currentPost === id ? true: false)
    }
    $scope.setCurrentPost=function(id){
        $scope.currentPost = id;
    }


    $http.get('api/profilepost')
        .then(function(response){
            $scope.posts=response.data;
        },function(response){

        })
});
