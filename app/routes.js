var express = require('express');
var mongoose=require('mongoose')
var router = express.Router();
var fs=require('fs');
var User=require('./models/User');
var router = express.Router();
var passport = require('passport');
var c=require('../config/passport');
var Post=mongoose.model('Post');
var Comment=mongoose.model('Comment');
var Friend=mongoose.model('Friend');
var multer=require('multer');
var upload = multer({dest: 'public/img1'});
router.post('/api/search',function(req,res){
    console.log(req.body);
    var query = { name: new RegExp('^' + req.body.data) };
    User.find(query,function(err,data){
        if(err)
            res.send(err);
        var query1={ data: new RegExp('^' + req.body.data)};
        Post.find(query1,function(err,post){
            res.send({data:data,post:post})
            //console.log(data,post);
        })
        
    })

})
router.post('/api/upload', upload.single('file'), function(req, res, next) {

    console.log('files:', req.file.filename);
    res.send(req.file.filename)
    // console.log("this is file uploading");
    //   	console.log('files:', req.file);
    //   	console.log('body:', req.body);
    // more code
});

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
                var friend=new Friend({
                    user:req.user
                })
                friend.save(function(err,data){
                    return res.status(200).json({
                        status: 'Registration successful!',
                        user:req.user
                    });
                })

            });
    });
});
router.post('/api/post',function(req,res){
    console.log(Post);
    var myPost = new Post({
        data:req.body.data,
        postedBy:req.user
    });

    myPost.save(function(err,data){
        if(err)
        res.send(err);
        myPost.populate('postedBy', function(err,post){
            if(err)
                res.send(err);
            res.send(post);

        })

    })
});
router.get('/api/post',function(req,res){
    Post.find().sort({createdOn:-1}).populate('postedBy').populate('comments')
        .exec(function(err,data){
            Post.populate(data,{
                path:'comments.commentedBy',
                model:'User'
            },function(err,datas){
                if(err)
                res.send(err);
                res.send(datas);

            })

        })
});
router.get('/api/profilepost',function(req,res){
    Post.find({'postedBy':req.user._id}).sort({createdOn:-1}).populate('postedBy').populate('comments')
        .exec(function(err,data){
            Post.populate(data,{
                path:'comments.commentedBy',
                model:'User'
            },function(err,datas){
                if(err)
                    res.send(err);
                res.send(datas);

            })

        })
});
router.post('/api/friendprofilepost',function(req,res){
    Post.find({'postedBy':req.body.id}).sort({createdOn:-1}).populate('postedBy').populate('comments')
        .exec(function(err,data){
            Post.populate(data,{
                path:'comments.commentedBy',
                model:'User'
            },function(err,datas){
                if(err)
                    res.send(err);
                User.findOne({_id:req.body.id},function(err,user){
                    res.send({posts:datas,user:user});
                })


            })

        })
});
router.post('/api/getFriendStatus',function(req,res){
    console.log("hello");
    Friend.find({$and:[{user:req.user._id},{friends:{$in:[req.body.id]}}]},function(err,data){
        if(err)
            res.send(err)
        //console.log(data);
        res.send(data);
    })
})
router.post('/api/addfriend',function(req,res){
    console.log(req.body.id,req.user._id);
    var query = {"user": req.body.id};
    var update ={$push:{friends:req.user}};
    //Friend.findOneAndUpdate(query, update, function(err, friends) {
    //    if (err) {
    //        console.log('got an error');
    //    }
    //    console.log(friends);
        var query1 = {"user": req.user._id};
        var update1 ={$push:{friends:req.body.id}};
        Friend.findOneAndUpdate(query1, update1, function(err, friend) {
            if (err) {
                console.log('got an error');
            }
            console.log(friend);
            res.send(friend);
        });

    //});

})
router.post('/api/countFollowers',function(req,res){
    Friend.findOne({user:req.body.id},function(err,data){
        if(err)
            res.send(err);
        //console.log(data.friends.length);
        Friend.count({friends:{$in:[req.body.id]}},function(err,data1){
            console.log(data1);
            if(err)
                res.send(err);
            res.send({following:data.friends.length,followers:data1});
        })

    })
})
router.post('/api/deletefriend',function(req,res){
    console.log(req.body.id,req.user._id);
    var query = {$and:[{user:req.user._id},{friends:{$in:[req.body.id]}}]};
    var update ={$pull:{friends:req.body.id}};
    Friend.findOneAndUpdate(query, update, function(err, friends) {
        if (err) {
            console.log('got an error');
        }
        console.log(friends);
        res.send(friends);
        //var query1 = {$and:[{user:req.body.id},{friends:{$in:[req.user._id]}}]};
        //var update1 ={$pull:{friends:req.user._id}};
        //Friend.findOneAndUpdate(query1, update1, function(err, friend) {
        //    if (err) {
        //        console.log('got an error');
        //    }
        //    console.log(friend);
        //    res.send(friend);
        //});

    });

})
router.post('/api/comment',function(req,res){
    //console.log(req.body);
    var myComment=new Comment({
        data:req.body.data,
        commentedBy:req.user
    })
    myComment.save(function(err,data){
        if(err)
        res.send(err);
        //console.log(data);
        var query = {"_id": req.body.post};
        var update ={$push:{comments:data}};
        Post.findOneAndUpdate(query, update, function(err, post) {
            if (err) {
                console.log('got an error');
            }

            console.log(post);
            post.populate('comments',function(err,data){
                //res.send(data);
                data.populate({path:'comments.commentedBy',model:'User'},function(err,datas){
                    res.send(datas);
                })
            }).populate('postedBy')


        });

        //Post.update({_id:req.body.post},{$push:{comments:data}},{multi: false},function(err,data){
        //    if(err)
        //        res.send(err);
        //    res.send({data:"Successful"});
        //})
    })

})
router.get('/api/getdata',function(req,res){
    res.send({user:req.user});
})
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
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {

            successRedirect : '/#/app/dashboard-v1',
            failureRedirect : '/'
        })
    );
    router.get('/api/logout', function(req, res) {
        console.log('hello4');
      req.logout();
      res.status(200).json({
        status: 'Bye!'
      });
    });
router.get('/auth/twitter',
    passport.authenticate('twitter')
);

    	// handle the callback after facebook has authenticated the user
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '//#/app/dashboard-v1',
        failureRedirect : '/'
    })
);
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/#/app/dashboard-v1',
        failureRedirect : '/'
    }));
    



module.exports = router;