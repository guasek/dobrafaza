'use strict';

var mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    Category = mongoose.model('Category');

/**
 * Returns all the videos.
 */
exports.getVideos = function(request, response) {
    if(request.query.per_page && request.query.page) {
        //TODO: Refactor na promisy
        var videosPerPage = request.query.per_page;
        var skipVideos = videosPerPage * (request.query.page - 1);
        return Video.find({}).sort({createdAt: -1}).skip(skipVideos).limit(videosPerPage).exec(function (err, videos) {
            Video.count({}, function(err, count) {
                if (!err) {
                    return response.json({'videos': videos, 'videosCount': count});
                } else {
                    return response.send(err);
                }
            });
        });
    } else {
        return Video.find({}).sort({createdAt: -1}).exec(function (err, videos) {
            if (!err) {
                return response.json(videos);
            } else {
                return response.send(err);
            }
        });
    }
};


/**
 * Adds new video to collection.
 *
 * @param request  Request.
 * @param response response.
 *
 * @returns {Query}
 */
exports.saveVideo = function(request, response) {
    var onFound = function(err, video) {
        if (err) {
            return console.error(err);
        }
        if (!video) {
            video = new Video();
        }
        var videoData = request.body;
        video.videoId = videoData.videoId;
        video.vendorId = videoData.vendorId;
        video.title = videoData.title;
        if (typeof videoData.categories !== "undefined") {
            video.categories = videoData.categories;
        }
        return video.save(function (err) {
            return response.json(video);
        });
    };
    return Video.findOne({ $or: [{_id: request.body._id}, {vendorId: request.body.vendorId}] }, onFound);
};

/**
 * Deletes a video.
 *
 * @param request
 * @param response
 */
exports.deleteVideo = function(request, response) {
    var videoId = request.param('videoId');
    Video.findOne({_id: videoId}).remove().exec();
    return response.json({status: 'ok'})
};

/**
 * Casts a vote on a given video.
 *
 * @param request
 * @param response
 */
exports.castVote = function(request, response) {
    var voteValue = request.body.voteValue;
    var videoId = request.param('videoId');
    var increment;

    if (voteValue === 1) {
        increment = {votesUp: 1};
    } else {
        increment = {votesDown: 1};
    }

    Video.update({'_id': videoId}, {$inc: increment}, function(err) {
    });
    return response.json({status: 'ok'});
};

/**
 * Fetches available system categories.
 *
 * @param request
 * @param response
 */
exports.getCategories = function(request, response) {
    Category.find({}).exec(function (err, categories) {
        if (!err) {
            return response.json(categories);
        } else {
            return response.send(err);
        }
    });
}