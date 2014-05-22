'use strict';

angular.module('dobraFaza', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'advertising',
    'youtube',
    'videoPlayback'
])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/video_player',
        controller: 'PlaybackController'
    })
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});