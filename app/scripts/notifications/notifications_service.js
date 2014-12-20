'use strict';

/**
 * Notifications service.
 *
 * @constructor
 */
function NotificationsService () {

    var currentLikeRequest = {
        title: '',
        videoId: '',
        vendorVideoId: ''
    };

    var notifier = document.getElementById('notifier');

    /**
     * Shows like box notification.
     *
     * @param {Video} videoForRequest Video to base request on.
     */
    var showLikeNotification = function (videoForRequest) {
        this.currentLikeRequest.title = videoForRequest.title;
        this.currentLikeRequest.videoId = videoForRequest.videoId;
        this.currentLikeRequest.vendorVideoId = videoForRequest.vendorVideoId;
        notifier.className = 'notifier ns-show';
    }

    /**
     * Closes currently shown notification.
     */
    var closeLikeNotification = function () {
        notifier.className = 'notifier ns-hide';
    }

    return {
        currentLikeRequest: currentLikeRequest,
        showLikeNotification: showLikeNotification,
        closeLikeNotification: closeLikeNotification
    };
}