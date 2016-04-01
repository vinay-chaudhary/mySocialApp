var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Comment =new Schema({
    data:{
        type:String,
        required:true
    },
    commentedBy:{
        type:Schema.ObjectId,
        ref:'User'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
})
return mongoose.model('Comment', Comment);
