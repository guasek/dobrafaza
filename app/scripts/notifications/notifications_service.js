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
     * Start showing ads in notification box.
     */
    var startMiesoNotifications = function () {
        setTimeout(showMiesoNotification, 5000);
    }

    /**
     * Shows ad in notification box.
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
        notifierMieso.className = 'notifier mieso ns-hide';
        setTimeout(function () {
            notifierMieso.className = 'notifier mieso ns-hide ng-hide';
        }, 1000);
        setTimeout(showMiesoNotification, 180000);
    }

    return {
        currentLikeRequest: currentLikeRequest,
        showLikeNotification: showLikeNotification,
        startMiesoNotifications: startMiesoNotifications,
        closeLikeNotification: closeLikeNotification,
        closeMiesoNotification: closeMiesoNotification
    };
}