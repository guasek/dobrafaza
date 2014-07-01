'use strict';
/* global YT */


angular.module('youtube', ['ng'])
    .service('youtubePlayerApi', [function () {
        var service = {};

        var playerId = null;
        var player = null;

        var onPlayerReady = function (event) {
            event.target.playVideo();
        };

        var destroyPlayer = function() {
            if (player) {
                try {
                    player.destroy();
                } catch(exception){}
            }
        };

        var createPlayer = function (_videoId, context) {
            return new YT.Player(playerId, {
                height: 360,
                width: 640,
                videoId: _videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: function (event) {
                        if(event.data === YT.PlayerState.ENDED) {
                            destroyPlayer();
                            context.playNextVideo();
                        }
                    },
                    onError: function() {
                        destroyPlayer();
                        context.playNextVideo();
                    }
                }
            });
        };

        service.playVideo = function(youtubeId, context) {
            destroyPlayer();
            player = createPlayer(youtubeId, context);
        };

        service.bindVideoPlayer = function (elementId) {
            playerId = elementId;
        };

        return service;
    }])
    .service('playerCode', ['$window', function ($window) {
        return {
            loadYoutubeScript: function () {
                var tag = $window.document.createElement('script');
                tag.src = '//www.youtube.com/iframe_api';
                var firstScriptTag = $window.document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
        };
    }])
    .directive('youtubePlayer', ['youtubePlayerApi', function (youtubePlayerApi) {
        return {
            restrict:'A',
            link:function (scope, element) {
                youtubePlayerApi.bindVideoPlayer(element[0].id);
            }
        };
    }]);