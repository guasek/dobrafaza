'use strict';

var mongoose = require('mongoose'),
    Video = mongoose.model('Video');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Video.find(function (err, videos) {
    if (!err) {
      return res.json(videos);
    } else {
      return res.send(err);
    }
  });
};