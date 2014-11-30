'use strict';

describe('Video test', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    var player;
    beforeEach(inject(function(videoPlayer) {
        player = videoPlayer;
    }))

    it('Should create youtube videos from pre products in factory', function () {
        var title = 'Title';
        var url = 'https://www.youtube.com/watch?v=CaWHAgATcxU';

        var videoFactory = new VideoFactory();
        videoFactory.videoPreProducts.title = title;
        videoFactory.videoPreProducts.url = url;

        expect(videoFactory.videoFromPreProducts).toThrow();

        var categories = [new Category(1, 'first', false)];
        videoFactory.useCategories(categories);

        expect(videoFactory.videoFromPreProducts).toThrow();

        categories.push(new Category(2, 'second', true));
        categories.push(new Category(3, 'third', true));
        videoFactory.useCategories(categories);

        var createdVideo = videoFactory.videoFromPreProducts();

        expect(createdVideo.title).toEqual(title);
        expect(createdVideo.videoId).toEqual(null);
        expect(createdVideo.vendorVideoId).toEqual('CaWHAgATcxU');
        expect(createdVideo.votesUp).toEqual(0);
        expect(createdVideo.votesDown).toEqual(0);
        expect(createdVideo.categories[0].idEquals(2)).toBeTruthy();
        expect(createdVideo.categories[1].idEquals(3)).toBeTruthy();

        expect(videoFactory.videoFromPreProducts).toThrow();
    });

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