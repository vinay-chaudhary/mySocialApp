app.controller('SearchController', ['$scope', '$http', '$state','userService', function($scope, $http, $state,userService) {
    $scope.searchItems=function(){
      //console.log($scope.searchItem);
      $http.post('/api/search',{data:$scope.searchItem})
      .then(function(response){
         console.log(response.data.data);
        $scope.users=response.data.data;
        $scope.posts=response.data.post;

          console.log($scope.users[0]._id);
      },
      function(response){

      });
    }
}]);