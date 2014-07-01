'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Video Schema
 */
var VideoSchema = new Schema({
    videoId: String,
    vendorId: Number,
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
    }
});

mongoose.model('Video', VideoSchema);
