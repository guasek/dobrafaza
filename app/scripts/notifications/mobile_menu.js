'use strict';

/**
 * Object responsible for managing mobile menu.
 *
 * @return {object}
 *
 * @constructor
 */
function MobileMenu () {

    var menu = document.getElementById('menu');

    /**
     * Function toggles mobile menu visibility on and off.
     *
     * @param attribute
     */
    var toggle = function (attribute) {
        console.log(attribute);
        var re = new RegExp('\\b' + 'visible' + '\\b', 'gi');
        attribute = attribute || 'className';
        if (!re.test(menu[attribute])) {
            menu[attribute] = (menu[attribute] += (' ' + 'visible')).trim();
        } else {
            menu[attribute] = menu[attribute].replace(re, '').trim();
        }
    };

    return {
        toggle: toggle
    };
}