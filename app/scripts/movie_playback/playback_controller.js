'use strict';
/* global PlayList, ConjunctionVideoFilter, AlternativeVideoFilter, CategoryVideoFilter, ExclusiveVideoFilter,
 SeenVideosFilter */

angular
    .module('dobraFaza')
    .controller('PlaybackController',
        ['$scope', '$window', '$routeParams', '$q', 'videoPlayer', 'videoRepository',
         'categoryRepository', 'playerCode', 'ezfb', 'eventPublisher', 'votingEnablingSubscriber',
         'seenVideosSubscriber', 'seenVideos', 'uiRefreshSubscriber',
         function ($scope, $window, $routeParams, $q, videoPlayer, videoRepository, categoryRepository,
                   playerCode, ezfb, eventPublisher, votingEnablingSubscriber, seenVideosSubscriber, seenVideos,
                   uiRefreshSubscriber)
        {
            $scope.shareToFb = function(video) {
                ezfb.ui(
                    {
                        method: 'share',
                        href: $window.location.host + '/play/' + video.videoId
                    }
                );
            };
            $window.onYouTubeIframeAPIReady = function () {
                $q.all([categoryRepository.fetchAll(), videoRepository.fetchAll()])
                .then(function(data) {
                    var categories = data[0];
                    var videos = data[1];
                    var startVideoId = $routeParams.videoId;

                    var seenMoviesFilter = new SeenVideosFilter(seenVideos);
                    var exclusiveVideoFilter = new ExclusiveVideoFilter(startVideoId);
                    var categoriesFilter = new CategoryVideoFilter(categories);

                    var playlistFilter = new AlternativeVideoFilter(
                        exclusiveVideoFilter,
                        new ConjunctionVideoFilter(seenMoviesFilter, categoriesFilter)
                    );
                    var playList = new PlayList(videos, playlistFilter);

                    eventPublisher.subscribe(votingEnablingSubscriber);
                    eventPublisher.subscribe(seenVideosSubscriber);
                    eventPublisher.subscribe(uiRefreshSubscriber);

                    videoPlayer.setPlaylist(playList);
                    videoPlayer.bringVideoToFront(startVideoId);

                    $scope.categories = categories;
                    $scope.videoPlayer = videoPlayer;

                    videoPlayer.startPlayback();

                    angular.element($window).on('keyup' , function (e) {
                        if (e.keyCode === 37) {
                            videoPlayer.playPreviousVideo();
                        }
                        if (e.keyCode ===  39) {
                            videoPlayer.playNextVideo();
                        }
                    });
                });
            };
            playerCode.loadYoutubeScript();
        }
        ]);
