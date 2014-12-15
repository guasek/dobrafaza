/*exported CategorySettings */
'use strict';

/**
 * Category settings, stores settings and allows to enable or disable category.
 *
 * @param cookieStore Cookie storage.
 *
 * @constructor
 */
function UserSettings(cookieStore) {
    this.categoriesCookieKey = 'inactive_categories';
    this.seenVideosCookieKey = 'seen_movies_filter_activated';
    this.cookieStore = cookieStore;

    var inactiveVideos =  cookieStore.get(this.categoriesCookieKey);
    this.inactiveCategories = typeof inactiveVideos === 'undefined' ? [] : inactiveVideos;
}

/**
 * Applies category settings to category list.
 *
 * @param {Array} categoriesList List of categories.
 */
UserSettings.prototype.configureCategories = function (categoriesList) {
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
UserSettings.prototype.storeCategorySettings = function (category) {
    if (category.isActive() && (this.inactiveCategories.indexOf(category.id) !== -1)) {
        this.inactiveCategories.splice(this.inactiveCategories.indexOf(category.id), 1);
        this.cookieStore.put(this.categoriesCookieKey, this.inactiveCategories);
    }
    if (!category.isActive() && (this.inactiveCategories.indexOf(category.id) === -1)){
        this.inactiveCategories.push(category.id);
        this.cookieStore.put(this.categoriesCookieKey, this.inactiveCategories);
    }
};

/**
 * Stores settings of seen videos filter
 *
 * @param {SeenVideosFilter} seenVideosFilter SeenVideosFilter object
 */
UserSettings.prototype.storeSeenMoviesSettings = function (seenVideosFilter) {
    this.cookieStore.put(this.seenVideosCookieKey, seenVideosFilter.active);
};

/**
 * Configures seen videos filter
 *
 * @param {SeenVideosFilter} seenVideosFilter SeenVideosFilter object
 */
UserSettings.prototype.configureSeenVideosFilter = function (seenVideosFilter) {
    var seenVideosActivated = this.cookieStore.get(this.seenVideosCookieKey);
    var isActive = typeof seenVideosActivated === 'undefined' ? true : seenVideosActivated;
    if (isActive) {
        seenVideosFilter.activate();
    } else{
        seenVideosFilter.deactivate();
    }
};
