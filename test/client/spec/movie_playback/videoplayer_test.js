'use strict';

describe('Videoplayer tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));


    it('Should create videoplayer with playlist.', function () {
        var playlist = PlayList.create(testVideos, filterStub);

        var videoPlayer = new VideoPlayer(
            youtubeVideoPlayer, dfAnimateMock, rootScopeMock, locationMock, cookieStoreMock
        );
        videoPlayer.setPlaylist(playlist);
        spyOn(youtubeVideoPlayer, 'playVideo');

        videoPlayer.startPlayback();
        expect(youtubeVideoPlayer.playVideo).toHaveBeenCalledWith('oukX49mJppM', videoPlayer);

        videoPlayer.playNextVideo();
        expect(youtubeVideoPlayer.playVideo).toHaveBeenCalledWith('KRwDTj-Rcmk', videoPlayer);
    });

    it('Can shuffle playlist.', function () {
        var playlist = PlayList.create(testVideos);

        var videoPlayer = new VideoPlayer(
            youtubeVideoPlayer, dfAnimateMock, rootScopeMock, locationMock, cookieStoreMock
        );
        videoPlayer.setPlaylist(playlist);

        spyOn(playlist, 'shuffle');

        videoPlayer.shufflePlaylist();
        expect(playlist.shuffle).toHaveBeenCalled();
    });
});