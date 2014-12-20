'use strict';

describe('Video filters tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should be able to be tell whether video from category should be shown.', function () {
        var category1 = new Category(1, 'Category name', true);
        var category2 = new Category(2, 'Category name 2', false);
        var category3 = new Category(3, 'Category name 3' , true);

        var categoryPlaylistFilter = new CategoryVideoFilter([category1, category2, category3]);

        var videoToBeShown1 = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoToBeShown2 = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0, [2, 3]);
        var videoToBeShown3 = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0, [3, 5]);

        var videoNotToBeShown1 = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0, [2]);
        var videoNotToBeShown2 = Video.youtubeVideo('oukX49mJppM', 'oukX49mJppM', "Title", 0, 0, [4]);

        expect(categoryPlaylistFilter.shouldPlay(videoToBeShown1)).toBeTruthy()
        expect(categoryPlaylistFilter.shouldPlay(videoToBeShown2)).toBeTruthy()
        expect(categoryPlaylistFilter.shouldPlay(videoToBeShown3)).toBeTruthy()

        expect(categoryPlaylistFilter.shouldPlay(videoNotToBeShown1)).toBeFalsy()
        expect(categoryPlaylistFilter.shouldPlay(videoNotToBeShown2)).toBeFalsy()
    });

    it('Should be able to filter seen videos', function () {

        var videoToBeShown = Video.youtubeVideo(1, 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoNotToBeShown = Video.youtubeVideo(2, 'oukX49mJppM', "Title", 0, 0, [2, 3]);

        var seenVideos = new SeenVideos(3, new cookieStoreStub());
        seenVideos.add(2);

        var seenMoviesPlaylistFilter = new SeenVideosFilter(seenVideos);

        expect(seenMoviesPlaylistFilter.shouldPlay(videoToBeShown)).toBeTruthy()
        expect(seenMoviesPlaylistFilter.shouldPlay(videoNotToBeShown)).toBeFalsy()

        seenMoviesPlaylistFilter.deactivate();
        expect(seenMoviesPlaylistFilter.shouldPlay(videoNotToBeShown)).toBeTruthy();

        seenMoviesPlaylistFilter.activate();
        expect(seenMoviesPlaylistFilter.shouldPlay(videoNotToBeShown)).toBeFalsy();
    });

    it('Can create and use conjunction filter', function () {
        var category1 = new Category(1, 'Category name', true);
        var category2 = new Category(2, 'Category name 2', false);

        var videoToBeShown = Video.youtubeVideo(1, 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoNotToBeShown1 = Video.youtubeVideo(2, 'oukX49mJppM', "Title", 0, 0, [2]);
        var videoNotToBeShown2 = Video.youtubeVideo(3, 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoNotToBeShown3 = Video.youtubeVideo(4, 'oukX49mJppM', "Title", 0, 0, [2]);

        var categoryPlaylistFilter = new CategoryVideoFilter([category1, category2]);
        var seenVideos = new SeenVideos(10, new cookieStoreStub());
        seenVideos.add(3);
        seenVideos.add(4);
        var seenMoviesPlaylistFilter = new SeenVideosFilter(seenVideos);
        var conjunctPlaylistFilter = new ConjunctionVideoFilter(categoryPlaylistFilter, seenMoviesPlaylistFilter);

        expect(conjunctPlaylistFilter.shouldPlay(videoToBeShown)).toBeTruthy();
        expect(conjunctPlaylistFilter.shouldPlay(videoNotToBeShown1)).toBeFalsy();
        expect(conjunctPlaylistFilter.shouldPlay(videoNotToBeShown2)).toBeFalsy();
        expect(conjunctPlaylistFilter.shouldPlay(videoNotToBeShown3)).toBeFalsy();
    });

    it('should be able to filter positively exclusive video.', function () {
        var startVideoId = 4;
        var otherVideoId = 5;
        var exclusiveVideoFilter = new ExclusiveVideoFilter(4);

        var videoToBeShown = Video.youtubeVideo(startVideoId, 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoNotToBeShown = Video.youtubeVideo(otherVideoId, 'oukX49mJppM', "Title", 0, 0, [1]);

        expect(exclusiveVideoFilter.shouldPlay(videoToBeShown)).toBeTruthy();
        expect(exclusiveVideoFilter.shouldPlay(videoNotToBeShown)).toBeFalsy();
    });

    it('Can create and use alternative filter', function () {
        var firstVideoId = 4;
        var otherVideoId = 5;
        var anotherVideoId = 6;
        var videoToBeShown1 = Video.youtubeVideo(firstVideoId, 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoToBeShown2 = Video.youtubeVideo(otherVideoId, 'oukX49mJppM', "Title", 0, 0, [1]);
        var videoNotToBeShown = Video.youtubeVideo(anotherVideoId, 'oukX49mJppM', "Title", 0, 0, [1]);

        var exclusiveVideoFilter = new ExclusiveVideoFilter(firstVideoId);
        var anotherExclusiveVideoFilter = new ExclusiveVideoFilter(otherVideoId);

        var alternativePlaylistFilter = new AlternativeVideoFilter(exclusiveVideoFilter, anotherExclusiveVideoFilter);

        expect(alternativePlaylistFilter.shouldPlay(videoToBeShown1)).toBeTruthy();
        expect(alternativePlaylistFilter.shouldPlay(videoToBeShown2)).toBeTruthy();
        expect(alternativePlaylistFilter.shouldPlay(videoNotToBeShown)).toBeFalsy();
    });
});