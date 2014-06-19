'use strict';

var mongoose = require('mongoose'),
    Video = mongoose.model('Video');

/**
 * Returns all the videos.
 */
exports.getVideos = function(request, response) {
  return Video.find(function (err, videos) {
    if (!err) {
      return response.json(videos);
    } else {
      return response.send(err);
    }
  });
};


/**
 * Adds new video to collection.
 *
 * @param request  Request.
 * @param response response.
 *
 * @returns {Query}
 */
exports.addNewVideo = function(request, response) {
    var onFound = function(err, video) {
        if (err) {
            return console.error(err);
        }
        if (video) {
            return response.json(video);
        }

        var newVideo = new Video();
        newVideo.videoId = request.body.videoId;
        newVideo.vendorId = request.body.vendorId;
        return newVideo.save(function (err) {
            return response.json(newVideo);
        });
    };
    return Video.findOne(request.body, onFound);
};

/**
 * Casts a vote on a given video.
 *
 * @param request
 * @param response
 */
exports.castVote = function(request, response) {

}