'use strict';

describe('Video test', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    var player;
    beforeEach(inject(function(videoPlayer) {
        player = videoPlayer;
    }))

    it('Should be playable by videoplayer', function () {
        spyOn(player, 'playYoutubeVideo');
        var video = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0);

        video.playWith(player);
        expect(player.playYoutubeVideo).toHaveBeenCalledWith('oukX49mJppM')
    });

    it('Can tell whether it belongs to category.', function () {
        var categoryId = 'zxdfsgdsvcxv';

        var video = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0, [categoryId]);

        var belongCategory = new Category(categoryId, 'Belonged category', true);
        var dontBelongCategory = new Category('dasasassda', 'Dont belong category', true);

        expect(video.belongsTo(belongCategory)).toBeTruthy();
        expect(video.belongsTo(dontBelongCategory)).toBeFalsy();
    });

    it('Can tell whether given id equals its own one.', function () {
        var videoId = 'zxdfsgdsvcxv';

        var video = Video.youtubeVideo(videoId, 'oukX49mJppM', "Title");

        expect(video.idEquals(videoId)).toBeTruthy();
        expect(video.idEquals(1235)).toBeFalsy();
    });
});