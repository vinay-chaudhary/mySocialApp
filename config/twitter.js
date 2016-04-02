var TwitterStrategy  = require('passport-twitter').Strategy;
var User       = require('../app/models/User');


var configAuth = require('./auth');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('twitter', new TwitterStrategy({
            consumerKey     : configAuth.twitterAuth.clientID,
            consumerSecret  : configAuth.twitterAuth.clientSecret,
            callbackURL     : configAuth.twitterAuth.callbackURL

        },
        function(token, tokenSecret, profile, done) {
                console.log(profile);
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Twitter
            process.nextTick(function() {

                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        console.log(profile);
                        console.log('...........................', token);
                        // if there is no user, create them
                        var newUser                 = new User();

                        // set all of the user data that we need
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        //newUser.twitter.usernam = profile.username;
                        newUser.name = profile.displayName;
                        newUser.username=profile.id

                        // save our user into the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            });

        }));

};

