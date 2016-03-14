/// <reference path="../../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        requires: "Articles require a title!"
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
});

exports.Article = mongoose.model('Article', schema);