'use strict';
/* global PlayList, ConjunctionVideoFilter, AlternativeVideoFilter, CategoryVideoFilter, ExclusiveVideoFilter,
 SeenVideosFilter */

angular
    .module('dobraFaza')
    .controller('PlaybackController',
        ['$scope', '$window', '$cookieStore', '$routeParams', '$q', 'videoPlayer', 'videoRepository',
         'categoryRepository', 'playerCode', 'ezfb',
         function ($scope, $window, $cookieStore, $routeParams, $q, videoPlayer, videoRepository, categoryRepository,
                   playerCode, ezfb)
        {
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
                $q.all([categoryRepository.fetchAll(), videoRepository.fetchAll()])
                .then(function(data) {
                    var categories = data[0];
                    var videos = data[1];
                    var startVideoId = $routeParams.videoId;

                    var seenMoviesFilter = new SeenVideosFilter($cookieStore.get('seenMovies') || []);
                    var exclusiveVideoFilter = new ExclusiveVideoFilter(startVideoId);
                    var categoriesFilter = new CategoryVideoFilter(categories);

                    var playlistFilter = new AlternativeVideoFilter(
                        exclusiveVideoFilter,
                        new ConjunctionVideoFilter(seenMoviesFilter, categoriesFilter)
                    );
                    var playList = new PlayList(videos, playlistFilter);

                    videoPlayer.setPlaylist(playList);
                    videoPlayer.bringVideoToFront(startVideoId);

                    $scope.categories = categories;
                    $scope.videoPlayer = videoPlayer;

                    videoPlayer.startPlayback();
                });
            };
            playerCode.loadYoutubeScript();
        }
        ]);
