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
        controller: 'PlaybackController',
        reloadOnSearch: false
    })
    .when('/play/:videoId', {
        templateUrl: 'partials/video_player',
        controller: 'PlaybackController',
        reloadOnSearch: false
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
})
.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}])
.run(['$rootScope', '$window', function($rootScope, $window) {
    $rootScope.goToHome = function() {
        $window.location.href = '/';
    }
}]);
