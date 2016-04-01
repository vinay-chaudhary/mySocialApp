//app.controller('PostController', function($scope,$http) {
//    $http.get('api/post')
//        .then(function(response){
//            console.log(response);
//
//        },function(response){
//
//        })
//});


app.controller('PostController', function($scope,$http,userService,Reddit) {
    $scope.status=false;
    $scope.htmlVariable = '<p>Post Here</p> ';
    //$scope.clickMe =function(id){
    //    console.log(id)
    //}

    $scope.currentUser=userService.getCookieData().name;
    console.log(userService.getCookieData().name)
    $scope.comment = "";
    $scope.currentPost=null;
    $scope.showComment=function(id){
        return ($scope.currentPost === id ? true: false)
    }
    $scope.setCurrentPost=function(id){
        $scope.currentPost = id;
    }
    $scope.postComment=function(){
        console.log($scope.comment);
    }
    $scope.submitPost=function(){
        //console.log($scope.htmlVariable);
        $http.post('/api/post',{data:$scope.htmlVariable,user:userService.getCookieData()})
            .then(function(response){
                $scope.reddit.items.unshift(response.data);
                console.log("success");
                $scope.htmlVariable = '<p>Post Here</p> ';

            },function(response){

            })

    }

    $scope.reddit = new Reddit();
    if($scope.reddit.after)
    $scope.status=false;
    //console.log($scope.reddit.items);
    //$scope.myPagingFunction=function(){
    //    $http.get('api/post')
    //        .then(function(response){
    //
    //            $scope.posts=response.data;
    //            console.log($scope.posts);
    //           // console.log($scope.posts);
    //
    //        },function(response){
    //
    //        })
    //}
});
