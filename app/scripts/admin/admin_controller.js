'use strict';

angular.module('dobraFaza')
    .controller('AdminController', ['$scope', '$http', '$window', 'videoRepository', function ($scope, $http, $window, videoRepository) {
        $scope.video = {
            title: '',
            url: '',
            addedVideoId: ''
        };
        $scope.videoRepository = videoRepository;
        $scope.baseUrl = $window.location.host;

        $scope.paginatedVideos = [];
        $scope.totalVideos = 1;
        $scope.videosPerPage = 25;

        function getResultsPage(pageNumber) {
            return videoRepository.fetchVideosChunk(pageNumber, $scope.videosPerPage).then(function (videosData) {
                $scope.paginatedVideos = videosData.videos;
                $scope.totalVideos = videosData.videosCount;
            });
        }

        getResultsPage(1)

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };
    }]);
