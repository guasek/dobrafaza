/* global  bean, domready*/
var app = {};

app.tools = (function (module, undefined)
{
    module.toggle = function (element, attributeValue, attribute) {
        var re = new RegExp('\\b' + attributeValue + '\\b', 'gi');
        attribute = attribute || 'className';
        if (!re.test(element[attribute])) {
            element[attribute] = (element[attribute] += (' ' + attributeValue)).trim();
        } else {
            element[attribute] = element[attribute].replace(re, '').trim();
        }
    };

    return module;
})(app.tools || {});


domready(function () {
    'use strict';

    var menuTrigger = document.getElementById('mobile-menu-switch'),
        menu = document.getElementById('menu'),
        notifier = document.getElementById('notifier'),
        notifierClose = document.getElementById('notifierClose'),
        about = document.getElementById('about'),
        aboutShow = document.getElementById('aboutShow'),
        aboutClose = document.getElementById('aboutClose'),
        overlayClose = document.getElementById('overlayClose');

    bean.on(menuTrigger, 'click', function() {
        app.tools.toggle(menu, 'visible');
    });


    setTimeout( function() {
        notifier.className = 'notifier ns-show';
    }, 1200);

    bean.on(notifierClose, 'click', function () {
        notifier.className = 'notifier ns-hide';
    });

    bean.on(aboutClose, 'click', function () {
        about.className = 'about';
    });
    bean.on(overlayClose, 'click', function () {
        about.className = 'about';
    });

    bean.on(aboutShow, 'click', function () {
        about.className = 'about show';
    });
});