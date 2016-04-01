app.controller('FriendProfileController', function($scope,$http,userService,$stateParams) {
   // console.log($stateParams.id);
    //$scope.follow="Follow";
    $scope.currentPost=null;
    $scope.showComment=function(id){
        return ($scope.currentPost === id ? true: false)
    }
    $scope.setCurrentPost=function(id){
        $scope.currentPost = id;
    }
    $scope.addFriend=function(){
        //console.log('hello');
       if($scope.follow==="Follow") {
           $http.post('/api/addfriend',{id:$stateParams.id})
               .then(function(response){


                       $scope.follow="Unfollow";
                   },
                   function(response){

                   })
       }
        else{
           $http.post('/api/deletefriend',{id:$stateParams.id})
               .then(function(response){


                       $scope.follow="Follow";
                   },
                   function(response){

                   })
       }


    }

    $http.post('api/getFriendStatus',{id:$stateParams.id})
        .then(function(response){
                //console.log(response);
                //console.log('hello');
                if(response.data.length)
                  $scope.follow="Unfollow";
                else
                    $scope.follow="Follow";
            },
            function (response) {

            }

        )
    $scope.getFollow=function() {
        $http.post('/api/countFollowers', {id: $stateParams.id})
            .then(function (response) {
                console.log(response.data);
                $scope.followNo = response.data;

            }, function (response) {

            })
    }

    $http.post('api/friendprofilepost',{id:$stateParams.id})
        .then(function(response){
           // console.log(response);
            $scope.username=response.data.user.name;
            $scope.posts=response.data.posts;
        },function(response){

        })

});

