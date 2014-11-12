'use strict';

function Category(id, name, turnedOn) {
    this.id = id;
    this.name = name;
    this.turnedOn = turnedOn;
}

/**
 * Tells whether category is active.
 *
 * @return {boolean}
 */
Category.prototype.isActive = function () {
    return this.turnedOn;
}

/**
 * Deactivates category.
 */
Category.prototype.deactivate = function () {
    this.turnedOn = false;
}

/**
 * Activates category.
 */
Category.prototype.activate = function () {
    this.turnedOn = true;
}

/**
 * Tells whether given id mathes the one category owns.
 *
 * @param idToCheck Id to be checked.
 *
 * @return {boolean}
 */
Category.prototype.idEquals = function (idToCheck) {
    return idToCheck === this.id ? true : false;
}