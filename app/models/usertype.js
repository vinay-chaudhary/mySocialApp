var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserTypeSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    uid: {
        type: Number,
        required: true,
        unique: true
    }
});
return mongoose.model('UserType', UserTypeSchema);
