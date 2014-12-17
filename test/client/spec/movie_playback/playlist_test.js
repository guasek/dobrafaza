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

        expect(playback.previousVideoPreview()._id).toEqual(testVideos[1]._id);
        expect(playback.rewind()._id).toEqual(testVideos[1]._id);
        expect(playback.isRewound()).toBeTruthy();

        expect(playback.rewind()._id).toEqual(testVideos[0]._id);
        expect(playback.isRewound()).toBeTruthy();

        expect(playback.nextVideoPreview()._id).toEqual(testVideos[1]._id);
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

    it('Should be able to preview next and previous videos..', function () {
        var showCategory = new Category(1, 'Category name', true);
        var dontShowCategory = new Category(2, 'Category name', false);
        var categoryFilter = new CategoryVideoFilter([showCategory, dontShowCategory]);
        var playlist = PlayList.create(testVideos, categoryFilter);

        var nextPreview = playlist.nextVideoPreview();
        expect(nextPreview.thumbnailUrl()).toEqual('http://i1.ytimg.com/vi/KRwDTj-Rcmk/hqdefault.jpg');
        expect(nextPreview.showTitle()).toEqual('Test 2');

        var nextPreviewAgain = playlist.nextVideoPreview();
        expect(nextPreviewAgain.thumbnailUrl()).toEqual('http://i1.ytimg.com/vi/KRwDTj-Rcmk/hqdefault.jpg');
        expect(nextPreviewAgain.showTitle()).toEqual('Test 2');

        playlist.next();

        var previousVideoPreview = playlist.previousVideoPreview();
        expect(previousVideoPreview.thumbnailUrl()).toEqual('images/temp.jpg');
        expect(previousVideoPreview.showTitle()).toEqual('Nie można cofnąć filmu');

        var newVideoPreview = playlist.nextVideoPreview();
        expect(newVideoPreview.thumbnailUrl()).toEqual('http://i1.ytimg.com/vi/Yz1rfDY-wlg/hqdefault.jpg');
        expect(newVideoPreview.showTitle()).toEqual('Test 4');

        dontShowCategory.activate();
        var changedCategoryPreview = playlist.nextVideoPreview();
        expect(changedCategoryPreview.thumbnailUrl()).toEqual('http://i1.ytimg.com/vi/ca1nQa2Feb0/hqdefault.jpg');
        expect(changedCategoryPreview.showTitle()).toEqual('Test 3');

        playlist.next();
        var previousVideoPreview = playlist.previousVideoPreview();
        expect(previousVideoPreview.thumbnailUrl()).toEqual('http://i1.ytimg.com/vi/KRwDTj-Rcmk/hqdefault.jpg');
        expect(previousVideoPreview.showTitle()).toEqual('Test 2');
    });
});