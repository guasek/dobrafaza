/*exported CategoryRepository */
'use strict';

/**
 * Category object.
 *
 * @param {CategoryId} id            Category id object.
 * @param {String}     name          Category name
 * @param {boolean}    turnedOn      Boolean stating whether category is active.
 * @param {string}     canonicalName Canonical category name.
 *
 * @constructor
 */
function Category(id, name, turnedOn, canonicalName) {
    this.id = id;
    this.name = name;
    this.canonicalName = canonicalName;
    this.turnedOn = turnedOn;
}

/**
 * Tells whether category is active.
 *
 * @return {boolean}
 */
Category.prototype.isActive = function () {
    return this.turnedOn;
};

/**
 * Deactivates category.
 */
Category.prototype.deactivate = function () {
    this.turnedOn = false;
};

/**
 * Activates category.
 */
Category.prototype.activate = function () {
    this.turnedOn = true;
};

/**
 * Tells whether given id mathes the one category owns.
 *
 * @param idToCheck Id to be checked.
 *
 * @return {boolean}
 */
Category.prototype.idEquals = function (idToCheck) {
    return idToCheck === this.id ? true : false;
};


/**
 * Category objects repository
 *
 * @param $http Http service
 * @param $q    Angular service providing promise interface.
 *
 * @constructor
 */
function CategoryRepository($http, $q) {

    /**
     * Fetches all the available videos.
     *
     * @return {Promise.promise}
     */
    var fetchAll = function () {
        var deferred = $q.defer();
        $http.get('/api/categories').success(function(rawCategories) {
            var categories = [];
            for (var index=0; index<rawCategories.length; index++) {
                var rawCategory = rawCategories[index];
                categories.push(new Category(rawCategory._id, rawCategory.name, true, rawCategory.canonicalName));
            }
            deferred.resolve(categories);
        });
        return deferred.promise;
    };

    return {
        fetchAll: fetchAll
    };
}