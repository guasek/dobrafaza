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
                            method: 'feed',
                            link: $window.location.host + '/play/' + video.videoId,
                            name: video.title,
                            picture: 'http://i1.ytimg.com/vi/' + video.vendorVideoId + '/mqdefault.jpg',
                            description: 'DobraFaza - włączasz i oglądasz'
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
