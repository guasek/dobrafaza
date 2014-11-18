'use strict';

describe('Playlist tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should create and shuffle playlist.', function () {
        var seenMoviesFilter = new SeenVideosFilter(['oukX49mJppM']);

        var playlist = PlayList.create(testVideos, seenMoviesFilter);

        playlist.shuffle();
        var video = playlist.next();
        var anotherVideo = playlist.next();

        expect(video).toEqual(jasmine.any(Video));
        expect(video).toNotEqual(anotherVideo);
        var retries = 10;
        while (retries) {
            playlist.shuffle();
            var anotherMovie = playlist.next();
            if (video !== anotherMovie) {
                break;
            }
            retries--;
        }
        expect(video).toNotEqual(anotherVideo);
    });

    //TODO: Dodać test na dynamiczne włączenie kategorii - czy zmieni się zwracany film.
    it('Should be able to properly filter played videos.', function () {
        var showCategory = new Category(1, 'Category name', true);
        var dontShowCategory = new Category(2, 'Category name', false);

        var startVideoFilter = new ExclusiveVideoFilter(testVideos[0]._id);
        var seenMoviesFilter = new SeenVideosFilter([testVideos[1]._id]);
        var categoryFilter = new CategoryVideoFilter([showCategory, dontShowCategory]);
        var completeFilter = new AlternativeVideoFilter(
            startVideoFilter, new ConjunctionVideoFilter(seenMoviesFilter, categoryFilter)
        )

        var playlist = PlayList.create(testVideos, completeFilter);

        var video = playlist.next();
        expect(video.idEquals(testVideos[0]._id)).toBeTruthy();

        var anotherVideo = playlist.next();
        expect(anotherVideo.idEquals(testVideos[3]._id)).toBeTruthy();

        var previousVideo = playlist.previous();
        expect(previousVideo.idEquals(testVideos[0]._id)).toBeTruthy();
    });
});