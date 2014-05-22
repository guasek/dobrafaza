'use strict';

describe('Videoplayer tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));


    it('Should create videoplayer with playlist.', function () {
        var playlist = PlayList.fromYoutubeIds(['oukX49mJppM', 'Yz1rfDY-wlg']);
        var youtubeVideoPlayer = {
            playVideo: function(youtubeId) {}
        };

        var videoPlayer = new VideoPlayer(youtubeVideoPlayer);
        videoPlayer.setPlaylist(playlist);
        spyOn(youtubeVideoPlayer, 'playVideo');

        videoPlayer.startPlayback();
        expect(youtubeVideoPlayer.playVideo).toHaveBeenCalledWith('oukX49mJppM', videoPlayer);

        videoPlayer.playNextVideo();
        expect(youtubeVideoPlayer.playVideo).toHaveBeenCalledWith('Yz1rfDY-wlg', videoPlayer);
    });

    it('Can shuffle playlist.', function () {
        var youtubeVideoPlayer = {
            playVideo: function(youtubeId) {}
        };
        var playlist = PlayList.fromYoutubeIds(['oukX49mJppM', 'Yz1rfDY-wlg', 'KRwDTj-Rcmk', 'ca1nQa2Feb0']);
        var videoPlayer = new VideoPlayer(youtubeVideoPlayer);
        videoPlayer.setPlaylist(playlist);

        spyOn(playlist, 'shuffle');

        videoPlayer.shufflePlaylist();
        expect(playlist.shuffle).toHaveBeenCalled();
    });
});