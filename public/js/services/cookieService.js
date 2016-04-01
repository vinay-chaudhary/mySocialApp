angular.module('CookieService',["ngCookies"]).factory("userService", [
    "$cookieStore", function($cookieStore) {
        var userName = "";

        return {
            setCookieData: function(username) {
                userName = username;
                $cookieStore.put("userName", username);
            },
            getCookieData: function() {
                userName = $cookieStore.get("userName");
                return userName;
            },
            clearCookieData: function() {
                userName = "";
                $cookieStore.remove("userName");
            }
        }
    }
]).factory('Reddit', function($http) {
    var Reddit = function() {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        $http.get('api/post').success(function(data) {
           // console.log(data);
            var items = data;
            var len=0;
            if(this.items.length)
                len=this.items.length;
            for (var i = len; (i < len+5 && i<items.length); i++) {

                this.items.push(items[i]);
            }
           // this.after = "t3_" + this.items[this.items.length - 1].id;
            this.busy = false;
            if(i>=items.length)
            this.after="No More Posts to Load";
        }.bind(this));
    };

    return Reddit;
});