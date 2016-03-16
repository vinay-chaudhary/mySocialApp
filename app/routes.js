var express = require('express');
var router = express.Router();
var fs=require('fs');
var User=require('./models/User');
var router = express.Router();
var passport = require('passport');
router.post('/api/signup', function(req,res){
    console.log(req.body);
    User.register(new User({ username: req.body.username,name:req.body.name,number:req.body.number,dob:req.body.dob}),req.body.password , function(err, account) {
           // console.log('hello');
            if (err) {
              return res.status(500).json({
                err: err
              });
            }
            console.log(account);
            passport.authenticate('local')(req, res, function () {
                console.log(req.user);
              return res.status(200).json({
                status: 'Registration successful!',
                  user:req.user
              });
            });
    });
});
    router.post('/api/login', function(req,res,next){

          passport.authenticate('local', function(err, user, info) {
            if (err) {
                //console.log('error.................................', err)
              return next(err);
            }
            if (!user) {
                //console.log('not found.................................', info)
              return res.status(401).json({
                err: info
              });
            }
            req.logIn(user, function(err) {
              if (err) {
                return res.status(500).json({
                  err: 'Could not log in user'
                });
              }
              res.status(200).json({
                status: 'Login successful!',
                user:user
              });
            });
          })(req, res, next);
    });
    // router.get('*',function(req,res){
    //  res.sendfile('./public/index.html');
    // });
    router.get('/logout', function(req, res) {
        console.log('hello4');
      req.logout();
      res.status(200).json({
        status: 'Bye!'
      });
    });    
    



module.exports = router;