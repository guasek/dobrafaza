'use strict';

describe('Playlist tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));


    it('Should create and shuffle playlist.', function () {
        var playlist = PlayList.fromYoutubeIds(['oukX49mJppM', 'Yz1rfDY-wlg', 'KRwDTj-Rcmk', 'ca1nQa2Feb0']);

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
});