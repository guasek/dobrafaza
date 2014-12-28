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
    var notifierMieso = document.getElementById('notifierMieso');

    /**
     * Shows like box notification.
     *
     * @param {Video} videoForRequest Video to base request on.
     */
    var showLikeNotification = function (videoForRequest) {
        this.currentLikeRequest.title = videoForRequest.title;
        this.currentLikeRequest.videoId = videoForRequest.videoId;
        this.currentLikeRequest.vendorVideoId = videoForRequest.vendorVideoId;
        notifier.className = 'notifier ns-show ng-show';
    }

    /**
     * Shows mieso box notification.
     *
     */
    var showMiesoNotification = function () {
        notifierMieso.className = 'notifier mieso ns-show ng-show';
    }

    /**
     * Closes currently shown notification.
     */
    var closeLikeNotification = function () {
        notifier.className = 'notifier ns-hide';
    }
    var closeMiesoNotification = function () {
        notifierMieso.className = 'notifier mieso ns-hide ng-hide';
    }

    return {
        currentLikeRequest: currentLikeRequest,
        showLikeNotification: showLikeNotification,
        showMiesoNotification : showMiesoNotification,
        closeLikeNotification: closeLikeNotification,
        closeMiesoNotification: closeMiesoNotification
    };
}