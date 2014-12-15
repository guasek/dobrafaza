'use strict';

describe('Category settings tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should be applicable to category list.', function () {
        var categoriesList = [
            new Category('123', 'cat1', true), new Category('321', 'cat2', true), new Category('111', 'cat3', true)
        ];
        spyOn(cookieStoreMock, "get").andReturn(['321']);
        spyOn(cookieStoreMock, "put");
        var categorySettings = new CategorySettings(cookieStoreMock);

        categorySettings.applyTo(categoriesList);

        expect(categoriesList[0].isActive()).toBeTruthy();
        expect(categoriesList[1].isActive()).toBeFalsy();
        expect(categoriesList[2].isActive()).toBeTruthy();

        categoriesList[0].deactivate();
        categorySettings.storeSettingOf(categoriesList[0]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123']);

        categoriesList[0].deactivate();
        categorySettings.storeSettingOf(categoriesList[1]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123']);

        categoriesList[1].deactivate();
        categorySettings.storeSettingOf(categoriesList[1]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123']);

        categoriesList[2].deactivate();
        categorySettings.storeSettingOf(categoriesList[2]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '123', '111']);

        categoriesList[0].activate();
        categorySettings.storeSettingOf(categoriesList[0]);
        expect(cookieStoreMock.put).toHaveBeenCalledWith('inactive_categories', ['321', '111']);
    });
});