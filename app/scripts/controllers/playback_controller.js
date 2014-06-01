'use strict';

angular.module('dobraFaza')
    .controller('PlaybackController',
        [
            '$scope',
            '$window',
            'videoPlayer',
            'videoRepository',
            'playerCode',
            function ($scope, $window, videoPlayer, videoRepository, playerCode) {
                $window.onYouTubeIframeAPIReady = function () {
                    videoRepository.fetchAll().success(function(data) {
                        var playList = PlayList.create(data);
                        videoPlayer.setPlaylist(playList)
                        videoPlayer.shufflePlaylist();
                        $scope.videoPlayer = videoPlayer;
                        videoPlayer.startPlayback();
                    });
                };
                playerCode.loadYoutubeScript();
    }])
    .controller('PlaySpecificController',
        [
            '$scope',
            '$window',
            '$routeParams',
            'videoPlayer',
            'videoRepository',
            'playerCode',
            function ($scope, $window, $routeParams, videoPlayer, videoRepository, playerCode) {
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
