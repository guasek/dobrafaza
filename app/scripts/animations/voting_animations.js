angular.module('dobrafaza.animations', [])
    .run(['$rootScope', '$dfAnimate', function($rootScope, $dfAnimate){
        $rootScope.$dfAnimate = $dfAnimate;
    }])
    .provider('$dfAnimate', function(){
        this.$get = [function(){
            var api = {};

            api.disableVoting = function disableVoting() {
                var voteDown = angular.element(document.querySelector('#hate'));
                var voteUp = angular.element(document.querySelector('#props'));
                var castVoteText = angular.element(document.querySelector('#controls h2'));
                voteDown.addClass('fade-out move-left');
                voteUp.addClass('fade-out move-right');
                castVoteText.text('Ocena zapisana');
            };

            api.enableVoting = function enableVoting() {
                var voteDown = angular.element(document.querySelector('#hate'));
                var voteUp = angular.element(document.querySelector('#props'));
                var castVoteText = angular.element(document.querySelector('#controls h2'));
                voteDown.removeClass('fade-out move-left');
                voteUp.removeClass('fade-out move-right');
                castVoteText.text('Oceń film');
            };

            return api;
        }];
    });