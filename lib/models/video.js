'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Video Schema
 */
var VideoSchema = new Schema({
    videoId: String,
    vendorId: String,
    title: String,
    votesUp:  {
        type: Number,
        default: 0
    },
    votesDown: {
        type: Number,
        default: 0
    },
    votesTotal: {
        type: Number,
        default: 0
    },
    categories: [],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Video', VideoSchema);
