'use strict';

describe('Tests seen videos.', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Test it can store up to specified number of seen videos.', function () {

        var seenVideos = new SeenVideos(3, new cookieStoreStub());

        var videoId1 = 'asdasd';
        var videoId2 = 'asdasdxcxz';
        var videoId3 = 'asczas';
        var videoId4 = 'asdsasczas';

        seenVideos.add(videoId1);
        seenVideos.add(videoId1);
        seenVideos.add(videoId1);
        expect(seenVideos.contains(videoId1)).toBeTruthy();

        seenVideos.add(videoId2);
        expect(seenVideos.contains(videoId2)).toBeTruthy();

        seenVideos.add(videoId3);
        expect(seenVideos.contains(videoId3)).toBeTruthy();

        seenVideos.add(videoId4);
        expect(seenVideos.contains(videoId4)).toBeTruthy();
        expect(seenVideos.contains(videoId3)).toBeFalsy();
        expect(seenVideos.contains(videoId2)).toBeFalsy();
        expect(seenVideos.contains(videoId1)).toBeFalsy();
    });
});