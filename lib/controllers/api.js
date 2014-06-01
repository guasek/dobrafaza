'use strict';

var mongoose = require('mongoose'),
    Video = mongoose.model('Video');

/**
 * Get awesome things
 */
exports.getVideos = function(req, res) {
  return Video.find(function (err, videos) {
    if (!err) {
      return res.json(videos);
    } else {
      return res.send(err);
    }
  });
};

exports.addNewVideo = function(req, res) {
    var onFound = function(err, video) {
        if (err) {
            return console.error(err);
        }
        if (video) {
            return res.json(video);
        }

        var newVideo = new Video();
        newVideo.videoId = req.body.videoId;
        newVideo.vendorId = req.body.vendorId;
        return newVideo.save(function (err) {
            return res.json(newVideo);
        });
    };
    return Video.findOne(req.body, onFound);
};