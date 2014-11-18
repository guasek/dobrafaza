'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
    name: String,
    status: {
        type:Number,
        default: 0
    },
    defaultState: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Category', CategorySchema);
