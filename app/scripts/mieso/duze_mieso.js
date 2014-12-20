'use strict';

var advertising = angular.module('mieso', []);

advertising
    .directive('duzeMieso', function() {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            template: '<div ng-transclude></div>',
            link: function() {
            }
        };
    });
