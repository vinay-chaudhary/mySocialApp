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
])