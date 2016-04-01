var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Post =new Schema({
    data:{
        type:String,
        required:true
    },
    postedBy:{
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
    },
    comments:[{
        type:Schema.ObjectId,
        ref:'Comment'
    }]
})
return mongoose.model('Post', Post);