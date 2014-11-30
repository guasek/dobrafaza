/* exported VideoRepository */
'use strict';

function Video(videoId, vendorVideoId, title, votesUp, votesDown, categories) {
    this.title = title;
    this.videoId = videoId;
    this.vendorVideoId = vendorVideoId;
    this.votesUp = votesUp;
    this.votesDown = votesDown;
    this.categories = categories;
}

/**
 * Plays video with given video player.
 *
 * @param videoPlayer Video player to use.
 */
Video.prototype.playWith = function(videoPlayer) {
    videoPlayer.playYoutubeVideo(this.vendorVideoId);
};

/**
 * Tells whether video belongs to a given category.
 *
 * @param checkedCategory Category to be checked against.
 *
 * @return {boolean}
 */
Video.prototype.belongsTo = function(checkedCategory) {
    for(var index=0; index < this.categories.length; index++) {
        if (checkedCategory.idEquals(this.categories[index])) {
            return true;
        }
    }
    return false;
};

/**
 * Tells whether compared id equals video's one.
 *
 * @param {Integer} comparedId
 *
 * @return {boolean}
 */
Video.prototype.idEquals = function(comparedId) {
    return comparedId === this.videoId ? true : false;
};

/**
 * Factory method, creates youtube videos.
 *
 * @return {Video}
 */
Video.youtubeVideo = function(videoId, youtubeId, title, votesUp, votesDown, categories) {
    return new Video(videoId, youtubeId, title, votesUp, votesDown, categories);
};


/**
 * Video repository.
 *
 * @param $http Http service
 * @param $q    Angular service providing promise interface.
 *
 * @constructor
 */
function VideoRepository($http, $q) {

    /**
     * Reconstructs all fetched videos.
     *
     * @param rawVideos Videos fetched from server.
     *
     * @return {Array}
     */
    var reconstructAllVideos = function(rawVideos) {
        var videos = [];
        for (var index=0; index<rawVideos.length; index++) {
            var rawVideo = rawVideos[index];
            videos.push(new Video(
                rawVideo._id,
                rawVideo.videoId,
                rawVideo.title,
                rawVideo.votesUp,
                rawVideo.votesDown,
                rawVideo.categories
            ));
        }
        return videos;
    }

    /**
     * Fetches single chunk of videos. Returns promise.
     *
     * @param {Number} pageNumber Number of the page to be fetched.
     * @param {Number} chunkSize  How many videos per page to fetch.
     *
     * @return {Promise.promise|*}
     */
    var fetchVideosChunk = function (pageNumber, chunkSize) {
        var deferred = $q.defer();
        $http.get('api/videos?per_page=' + chunkSize + '&page=' + pageNumber)
            .success(function(rawData) {
                var videos = reconstructAllVideos(rawData.videos);
                deferred.resolve({'videos': videos, 'videosCount': rawData.videosCount});
            });
        return deferred.promise;
    };

    /**
     * Fetches all available videos from backend.
     *
     * @return {Array}
     */
    var fetchAll = function () {
        var deferred = $q.defer();
        $http.get('/api/videos').success(function(rawVideos) {
            var videos = reconstructAllVideos(rawVideos);
            deferred.resolve(videos);
        });
        return deferred.promise;
    };

    /**
     * Stores given video in backend.
     *
     * @param {Video} video Video to be stored.
     */
    var store = function (video) {
        var youtubeRegex = /^.*v=([^#\&\?]*).*/;
        var youtubeId = youtubeRegex.exec(video.url, 'i');
        $http.put('/api/videos', {title: video.title, videoId: youtubeId[1], vendorId: 1})
            .success(function (responseData){
                video.addedVideoId = responseData._id;
            });
    };

    return {
        fetchAll: fetchAll,
        fetchVideosChunk: fetchVideosChunk,
        store: store
    };
}