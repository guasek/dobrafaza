'use strict';

angular.module('dobraFaza')
    .controller('AdminController', [
        '$scope',
        '$http',
        '$window',
        'videoRepository',
        'categoryRepository', function ($scope, $http, $window, videoRepository, categoryRepository) {
            var videoFactory = new VideoFactory();
            $scope.videoRepository = videoRepository;
            $scope.videoFactory = videoFactory
            $scope.baseUrl = $window.location.host;

            $scope.paginatedVideos = [];
            $scope.totalVideos = 1;
            $scope.videosPerPage = 25;
            $scope.pagination = {
                current: 1
            };

            categoryRepository.fetchAll().then(function (categories) {
                videoFactory.useCategories(categories);
            });

            function getResultsPage(pageNumber) {
                return videoRepository.fetchVideosChunk(pageNumber, $scope.videosPerPage).then(function (videosData) {
                    $scope.paginatedVideos = videosData.videos;
                    $scope.totalVideos = videosData.videosCount;
                });
            }

            getResultsPage(1);

            $scope.pageChanged = function(newPage) {
                getResultsPage(newPage);
            };
    }]);
