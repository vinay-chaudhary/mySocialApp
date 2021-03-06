
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
		type:String
	},
	facebook:{
		id:{
			type:String
		},
		token:{
			type:String
		}

	},
	twitter:{
		id:{
			type:String
		},
		token:{
			type:String
		}
	},
	google:{
		id:{
			type:String
		},
		token:{
			type:String
		}

	},
	password:{type:String},
	dob:{type:Date},
	number:{type:Number},
	userType: {
		type: Schema.ObjectId,
		ref: 'UserType'
	},
	isVisited:{
		type:Boolean,
		default:false
	},
	roles: [{
		type: Schema.ObjectId,
		ref: 'Role'
	}]
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);