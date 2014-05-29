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
                $scope.videoPlayer = videoPlayer;
                videoPlayer.startPlayback();
            });
        };
        var tag = $window.document.createElement('script');
        tag.src = '//www.youtube.com/iframe_api';
        var firstScriptTag = $window.document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}]);
