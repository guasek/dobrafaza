'use strict';

angular.module('dobraFaza')
    .controller('PlaybackController',
        [
            '$scope',
            '$window',
            '$cookieStore',
            '$routeParams',
            'videoPlayer',
            'videoRepository',
            'playerCode',
            'ezfb',
            function ($scope, $window, $cookieStore, $routeParams, videoPlayer, videoRepository, playerCode, ezfb) {
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
                        var seenMovies = $cookieStore.get('seenMovies');
                        var startFromMovie = $routeParams.videoId;
                        var playList = PlayList.create(data, seenMovies, startFromMovie);
                        videoPlayer.setPlaylist(playList);
                        videoPlayer.bringVideoToFront(startFromMovie);
                        $scope.videoPlayer = videoPlayer;
                        videoPlayer.startPlayback();
                    });
                };
                playerCode.loadYoutubeScript();
    }]);
