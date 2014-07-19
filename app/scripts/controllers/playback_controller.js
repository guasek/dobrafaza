'use strict';

angular.module('dobraFaza')
    .controller('PlaybackController',
        [
            '$scope',
            '$window',
            '$routeParams',
            'videoPlayer',
            'videoRepository',
            'playerCode',
            'ezfb',
            function ($scope, $window, $routeParams, videoPlayer, videoRepository, playerCode, ezfb) {
                $scope.currentVideo = null;
                $scope.shareToFb = function(video) {
                    ezfb.ui(
                        {
                            method: 'share',
                            href: $window.location.host + '/play/' + video.videoId
                        }
                    );
                };
                $window.onYouTubeIframeAPIReady = function () {
                    videoRepository.fetchAll().success(function(data) {
                        var playList = PlayList.create(data);
                        videoPlayer.setPlaylist(playList)
                        videoPlayer.shufflePlaylist();
                        videoPlayer.bringVideoToFront($routeParams.videoId)
                        $scope.videoPlayer = videoPlayer;
                        videoPlayer.startPlayback();
                    });
                };
                playerCode.loadYoutubeScript();
    }]);
