
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModuleSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    actions: [{
        type: String,
        enum: ['View', 'Create', 'Edit', 'Delete'],
        default: 'View'
    }],
    viewPermission: [{
        type: Number,
        required: true
    }],
    createPermission: [{
        type: Number,
        required: true
    }],
    editPermission: [{
        type: Number,
        required: true
    }],
    deletePermission: [{
        type: Number,
        required: true
    }]
});
return mongoose.model('Module', ModuleSchema);
