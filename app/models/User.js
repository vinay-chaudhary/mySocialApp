
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  	name:{type:String},
	username:{type:String},
	password:{type:String},
	dob:{type:Date},
	number:{type:Number}
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);