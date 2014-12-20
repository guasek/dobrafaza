'use strict';

describe('Category settings tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should be able to setup categories settings.', function () {
        var categoriesList = [
            new Category('123', 'cat1', true), new Category('321', 'cat2', true), new Category('111', 'cat3', true)
        ];
        spyOn(cookieStoreMock, "get").andReturn(['321']);
        spyOn(cookieStoreMock, "put");
        var userSettings = new UserSettings(cookieStoreMock);

        userSettings.configureCategories(categoriesList);

        expect(categoriesList[0].isActive()).toBeTruthy();
        expect(categoriesList[1].isActive()).toBeFalsy();
        expect(categoriesList[2].isActive()).toBeTruthy();

        categoriesList[0].deactivate();
        userSettings.storeCategorySettings(categoriesList[0]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123']);

        categoriesList[0].deactivate();
        userSettings.storeCategorySettings(categoriesList[1]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123']);

        categoriesList[1].deactivate();
        userSettings.storeCategorySettings(categoriesList[1]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123']);

        categoriesList[2].deactivate();
        userSettings.storeCategorySettings(categoriesList[2]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123', '111']);

        categoriesList[0].activate();
        userSettings.storeCategorySettings(categoriesList[0]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '111']);
    });

    it('Should be able to setup and store movies repeating setting.', function () {
        spyOn(cookieStoreMock, "get").andReturn(false);
        spyOn(cookieStoreMock, "put");

        var seenVideosFilter = new SeenVideosFilter();
        var userSettings = new UserSettings(cookieStoreMock);

        userSettings.configureSeenVideosFilter(seenVideosFilter);
        expect(seenVideosFilter.active).toBeFalsy();

        seenVideosFilter.activate();
        userSettings.storeSeenMoviesSettings(seenVideosFilter);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('seen_movies_filter_activated', true);

        seenVideosFilter.deactivate();
        userSettings.storeSeenMoviesSettings(seenVideosFilter);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('seen_movies_filter_activated', false);
    });
});