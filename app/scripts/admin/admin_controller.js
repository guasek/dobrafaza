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
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        //TODO: Przenieść do repozytorium, skorzystać z $q
        function getResultsPage(pageNumber) {
            $http.get('api/videos?per_page=' + $scope.videosPerPage + '&page=' + pageNumber)
                .then(function(result) {
                    $scope.paginatedVideos = result.data.videos;
                    $scope.totalVideos = result.data.videosCount;
            });
        }
    }]);
