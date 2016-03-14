/// <reference path="../../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'A username is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'A password is required'
    }
});

exports.User = mongoose.model('User', schema);