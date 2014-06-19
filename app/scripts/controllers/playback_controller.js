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
            function ($scope, $window, $routeParams, videoPlayer, videoRepository, playerCode) {
                $scope.currentVideo = null;
                $window.onYouTubeIframeAPIReady = function () {
                    videoRepository.fetchAll().success(function(data) {
                        var playList = PlayList.create(data);
                        videoPlayer.setPlaylist(playList)
                        videoPlayer.shufflePlaylist();
                        videoPlayer.bringVideoToFront($routeParams.videoId)
                        $scope.videoPlayer = videoPlayer;
                        $scope.currentVideo = videoPlayer.startPlayback();
                    });
                };
                playerCode.loadYoutubeScript();
    }]);
