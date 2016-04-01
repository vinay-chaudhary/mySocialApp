var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Friend =new Schema({
    user:{
        type:Schema.ObjectId,
        ref:'User'
    },
    friends:[{
        type:Schema.ObjectId,
        ref:'User',
        unique:'One friend cannot be added twice'
    }]
})
return mongoose.model('Friend', Friend);

