'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var RoleSchema = new Schema({
    name: {
        type: String,
        required: 'Role Name is required.',
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: 'Role Description is required.',
        trim: true
    },
    userType: {
        type: Schema.ObjectId,
        ref: 'UserType',
        required: 'User type field is required.'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    updatedBy:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    permissions: [
        {
            module: {
                type: Schema.ObjectId,
                ref: 'Module',
                required:true
            },
            actions:[{
                type: String,
                enum: 'VIEW,CREATE,EDIT,DELETE',
                default:'VIEW'
            }]
        }
    ]

});
return mongoose.model('Role', RoleSchema);