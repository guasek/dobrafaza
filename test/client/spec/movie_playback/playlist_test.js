'use strict';

describe('Playlist and PlaybackControls tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should be able to traverse played videos forth and backwards.', function () {
        var playback = new PlaybackControls();

        playback.nowPlaying(testVideos[0]);
        playback.nowPlaying(testVideos[0]);
        playback.nowPlaying(testVideos[1]);
        playback.nowPlaying(testVideos[2]);

        expect(playback.isRewound()).toBeFalsy();

        expect(playback.rewind()._id).toEqual(testVideos[1]._id);
        expect(playback.isRewound()).toBeTruthy();

        expect(playback.rewind()._id).toEqual(testVideos[0]._id);
        expect(playback.isRewound()).toBeTruthy();

        expect(playback.fastForward()._id).toEqual(testVideos[1]._id);
        expect(playback.isRewound()).toBeTruthy();

        expect(playback.fastForward()._id).toEqual(testVideos[2]._id);
        expect(playback.isRewound()).toBeFalsy();
    });

    it('Should be able to properly filter played videos.', function () {
        var showCategory = new Category(1, 'Category name', true);
        var dontShowCategory = new Category(2, 'Category name', false);
        var seenVideos = new SeenVideos(3, new cookieStoreStub());
        seenVideos.add(testVideos[1]._id);
        var startVideoFilter = new ExclusiveVideoFilter(testVideos[0]._id);
        var seenMoviesFilter = new SeenVideosFilter(seenVideos);
        var categoryFilter = new CategoryVideoFilter([showCategory, dontShowCategory]);
        var completeFilter = new AlternativeVideoFilter(
            startVideoFilter, new ConjunctionVideoFilter(seenMoviesFilter, categoryFilter)
        )

        var playlist = PlayList.create(testVideos, completeFilter);

        expect(playlist.next().idEquals(testVideos[0]._id)).toBeTruthy();
        expect(playlist.next().idEquals(testVideos[3]._id)).toBeTruthy();

        dontShowCategory.activate();
        expect(playlist.previous().idEquals(testVideos[0]._id)).toBeTruthy();
        expect(playlist.next().idEquals(testVideos[3]._id)).toBeTruthy();
        expect(playlist.next().idEquals(testVideos[2]._id)).toBeTruthy();
        expect(playlist.previous().idEquals(testVideos[3]._id)).toBeTruthy();
    });
});