'use strict';

/**
 * Controller responsible for managing notification box.
 *
 * @constructor
 */
function NotificationBoxController ($scope, notificationsService, eventPublisher, likeNotificationSubscriber) {
    eventPublisher.subscribe(likeNotificationSubscriber);
    $scope.likeRequest = notificationsService.currentLikeRequest;
}

angular
    .module('Notifications', [])
    .factory('notificationsService', [ NotificationsService ])
    .factory('likeNotificationSubscriber', ['notificationsService', LikeNotificationSubscriber ])
    .controller(
        'NotificationBoxController',
        ['$scope', 'notificationsService', 'eventPublisher', 'likeNotificationSubscriber' , NotificationBoxController]
    );
