'use strict';

describe('Video test', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));


    it('Create be able to create videos.', function () {
        var youtubeVideo = Video.youtubeVideo('oukX49mJppM');
        expect(youtubeVideo).toEqual(jasmine.any(Video))
    });

    it('Should be playable by videoplayer', function () {
        var player = new VideoPlayer();
        spyOn(player, 'playYoutubeVideo');

        var video = Video.youtubeVideo('oukX49mJppM');

        video.playWith(player);
        expect(player.playYoutubeVideo).toHaveBeenCalledWith('oukX49mJppM')
    });
});