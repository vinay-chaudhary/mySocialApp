
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  	name:{
		type:String,
		trim:true,
		required:'Name is Required'
	},
	username:{
		type:String,
		unique:'E-mail already exists',
		required:'Email is Required'
	},
	password:{type:String},
	dob:{type:Date},
	number:{type:Number},
	userType: {
		type: Schema.ObjectId,
		ref: 'UserType',
		required: 'Signup As field is required.'
	},
	roles: [{
		type: Schema.ObjectId,
		ref: 'Role',
		required: true
	}]
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);