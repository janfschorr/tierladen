(function (angular) {
    'use strict';
    var PetFactory = function ($resource) {
        return $resource('/pet/:id', {
            id: '@id'
        }, {
            remove: {
                method: "DELETE"
            }
        });
    };

    PetFactory.$inject = ['$resource'];
    angular.module("tierladenApp.services").factory("Pet", PetFactory);
}(angular));