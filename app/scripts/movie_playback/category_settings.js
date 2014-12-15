/*exported CategorySettings */
'use strict';

/**
 * Category settings, stores settings and allows to enable or disable category.
 *
 * @param cookieStore Cookie storage.
 *
 * @constructor
 */
function CategorySettings(cookieStore) {
    this.cookieKey = 'inactive_categories';
    this.cookieStore = cookieStore;

    var inactiveVideos =  cookieStore.get(this.cookieKey);
    this.inactiveCategories = typeof inactiveVideos === 'undefined' ? [] : inactiveVideos;
}

/**
 * Applies category settings to category list.
 *
 * @param {Array} categoriesList List of categories.
 */
CategorySettings.prototype.applyTo = function (categoriesList) {
    for (var index = 0; index < categoriesList.length; index++) {
        var currentCategory = categoriesList[index];
        if (this.inactiveCategories.indexOf(currentCategory.id) !== -1) {
            currentCategory.deactivate();
        }
    }
};

/**
 * Toggles activation for a category with given id.
 *
 * @param {Category} category Category setting to be stored.
 */
CategorySettings.prototype.storeSettingOf = function (category) {
    if (category.isActive() && (this.inactiveCategories.indexOf(category.id) !== -1)) {
        this.inactiveCategories.splice(this.inactiveCategories.indexOf(category.id), 1);
        this.cookieStore.put(this.cookieKey, this.inactiveCategories);
    }
    if (!category.isActive() && (this.inactiveCategories.indexOf(category.id) === -1)){
        this.inactiveCategories.push(category.id);
        this.cookieStore.put(this.cookieKey, this.inactiveCategories);
    }
}