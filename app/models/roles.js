'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('./../helpers/custom-validator.js');


var RoleSchema = new Schema({
    name: {
        type: String,
        match: [validator.regex.name, 'Role Name should not contain numeric or special characters.'],
        validate: validator.stringLength(50, 'Role Name should be maximum 50 characters in length.'),
        required: 'Role Name is required.',
        unique: true,
        trim: true
    },
    description: {
        type: String,
        validate: validator.stringLength(200, 'Role Description should be maximum 200 characters in length.'),
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