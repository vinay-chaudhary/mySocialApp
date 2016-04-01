angular.module('app').directive('myEnter', function ($http) {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                    $http.post('/api/comment',{data:element.val(),post:scope.currentPost})
                        .then(
                            function(data){
                                element.val('');
                                for(i in scope.reddit.items){
                                    if(scope.reddit.items[i]._id==data.data._id) {
                                        scope.reddit.items[i] = data.data;
                                    }
                                }
                            },
                            function(data){
                                console.log('error');
                            }
                        )
                });
                event.preventDefault();
            }
        });
    };
});
