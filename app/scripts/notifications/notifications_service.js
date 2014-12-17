'use strict';

/**
 * Notifications service.
 *
 * @constructor
 */
function NotificationsService () {

    var currentLikeRequest = {
        title: '',
        videoId: ''
    };

    /**
     * Shows like box notification.
     *
     * @param {Video} videoForRequest Video to base request on.
     */
    var showLikeNotification = function (videoForRequest) {
        currentLikeRequest = {
            title: videoForRequest.title,
            videoId: videoForRequest.videoId
        };
        console.log(currentLikeRequest);
    }

    return {
        currentLikeRequest: currentLikeRequest,
        showLikeNotification: showLikeNotification
    };
}