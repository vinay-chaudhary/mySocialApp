app.controller('EditorCtrl', function($scope,$http,userService) {
  $scope.htmlVariable = '<p>Post Here</p> ';

  $scope.submitPost=function(){
    //console.log($scope.htmlVariable);
    $http.post('/api/post',{data:$scope.htmlVariable,user:userService.getCookieData()})
        .then(function(response){
          console.log('success');

        },function(response){

        })

  }
});