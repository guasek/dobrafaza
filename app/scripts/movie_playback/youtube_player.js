'use strict';
/* global YT */


angular.module('youtube', ['ng']).run(function () {
    var tag = document.createElement('script');
    tag.src = '//www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})
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
                height: 427,
                width: 700,
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
    .directive('youtubePlayer', ['youtubePlayerApi', function (youtubePlayerApi) {
        return {
            restrict:'A',
            link:function (scope, element) {
                youtubePlayerApi.bindVideoPlayer(element[0].id);
            }
        };
    }]);