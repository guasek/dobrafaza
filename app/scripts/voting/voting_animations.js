/* global VotingEnablingSubscriber, VotingDisablingSubscriber */
'use strict';

angular.module('dobrafaza.animations', [])
    .run(['$rootScope', '$dfAnimate', function($rootScope, $dfAnimate){
        $rootScope.$dfAnimate = $dfAnimate;
    }])
    .provider('$dfAnimate', function(){
        this.$get = [function(){
            var api = {};

            api.showAboutUs = function showAboutUs() {
                document.getElementById('about').className = 'about show';
            };

            api.hideAboutUs = function hideAboutUs() {
                document.getElementById('about').className = 'about';
            };

            return api;
        }];
    })
    .factory('votingEnablingSubscriber', ['$dfAnimate', '$location', VotingEnablingSubscriber])
    .factory('votingDisablingSubscriber', ['$dfAnimate', VotingDisablingSubscriber]);
