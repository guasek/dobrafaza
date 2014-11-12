'use strict';

describe('Category tests', function () {

    // load the controller's module
    beforeEach(module('dobraFaza'));

    it('Should be able to be turned on and of.', function () {
        var category = new Category(1, 'Category name', true);
        expect(category.isActive()).toBeTruthy();

        category.deactivate();
        expect(category.isActive()).toBeFalsy();

        category.activate();
        expect(category.isActive()).toBeTruthy();
    });

    it('Should be able to tell wheter its id is equat.', function () {
        var category = new Category(1, 'Category name', true);

        expect(category.idEquals(1)).toBeTruthy();
        expect(category.idEquals(2)).toBeFalsy();
    });
});