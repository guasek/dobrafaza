'use strict';

var advertising = angular.module('advertising', []);

advertising
    .directive('googleAdsense', function() {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            template: '<div ng-transclude></div>',
            link: function() {
            }
        };
    });
