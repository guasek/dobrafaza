'use strict';

angular.module('dobraFaza', [
    'ezfb',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'advertising',
    'youtube',
    'videoPlayback',
    'dobrafaza.animations',
    'voting'
])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/video_player',
        controller: 'PlaybackController'
    })
    .when('/play/:videoId', {
        templateUrl: 'partials/video_player',
        controller: 'PlaybackController'
    })
    .when('/janrodzyn', {
        templateUrl: 'partials/admin',
        controller: 'AdminController'
    })
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
})
.config(function (ezfbProvider) {
    ezfbProvider.setInitParams({
        appId: '155047164703791'
    });
});;