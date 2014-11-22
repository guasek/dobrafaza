/* global VotingEnablingSubscriber, VotingDisablingSubscriber */
'use strict';

angular.module('dobrafaza.animations', [])
    .run(['$rootScope', '$dfAnimate', function($rootScope, $dfAnimate){
        $rootScope.$dfAnimate = $dfAnimate;
    }])
    .provider('$dfAnimate', function(){
        this.$get = [function(){
            var api = {};

            api.disableVoting = function disableVoting() {
                angular.element(document.querySelector('#voting')).slideUp();
                angular.element(document.querySelector('#voted')).slideDown();
            };

            api.enableVoting = function enableVoting() {
                angular.element(document.querySelector('#voting')).slideDown();
                angular.element(document.querySelector('#voted')).slideUp();
            };

            return api;
        }];
    })
    .factory('votingEnablingSubscriber', ['$dfAnimate', '$location', VotingEnablingSubscriber])
    .factory('votingDisablingSubscriber', ['$dfAnimate', VotingDisablingSubscriber]);
