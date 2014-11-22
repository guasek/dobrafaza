'use strict';

describe('Videoplayer tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));


    it('Should create videoplayer with playlist.', function () {
        var playlist = PlayList.create(testVideos, filterStub);

        var videoPlayer = new VideoPlayer(
            youtubeVideoPlayer, rootScopeMock, cookieStoreMock, eventDispatcherMock
        );
        videoPlayer.setPlaylist(playlist);
        spyOn(youtubeVideoPlayer, 'playVideo');

        videoPlayer.startPlayback();
        expect(youtubeVideoPlayer.playVideo).toHaveBeenCalledWith('oukX49mJppM', videoPlayer);

        videoPlayer.playNextVideo();
        expect(youtubeVideoPlayer.playVideo).toHaveBeenCalledWith('KRwDTj-Rcmk', videoPlayer);
    });
});