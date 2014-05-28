'use strict';

angular.module('dobraFaza')
  .controller('PlaybackController', ['$scope', '$window', 'videoPlayer', 'videoRepository', function ($scope, $window, videoPlayer, videoRepository) {
        $window.onYouTubeIframeAPIReady = function () {
            videoRepository.fetchAll().success(function(data) {
            var playList = PlayList.fromYoutubeIds(data.map(function (element) {
                return element.videoId;
            }));
            videoPlayer.setPlaylist(playList)
            videoPlayer.shufflePlaylist();
            videoPlayer.startPlayback();
            $scope.videoPlayer = videoPlayer;
        });
    };
}]);
