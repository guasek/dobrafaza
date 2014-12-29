'use strict';

/**
 * Controller responsible for managing notification box.
 *
 * @constructor
 */
function NotificationBoxController ($scope, notificationsService, eventPublisher, likeNotificationSubscriber) {
    eventPublisher.subscribe(likeNotificationSubscriber);
    $scope.notificationsService = notificationsService;
    notificationsService.startMiesoNotifications();
}

function MenuController ($scope, mobileMenu) {
    $scope.mobileMenu = mobileMenu;
}

angular
    .module('Notifications', [])
    .factory('mobileMenu', [ MobileMenu ])
    .factory('notificationsService', [ NotificationsService ])
    .factory('likeNotificationSubscriber', ['notificationsService', LikeNotificationSubscriber ])
    .controller('MenuController', ['$scope', 'mobileMenu', MenuController])
    .controller(
        'NotificationBoxController',
        ['$scope', 'notificationsService', 'eventPublisher', 'likeNotificationSubscriber' , NotificationBoxController]
    );
