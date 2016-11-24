(function (angular) {
    'use strict';
    var PetDetailsDirective = function () {
        var controller = ['$scope', function ($scope) {
        }];
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                pet: "="
            },
            templateUrl: 'app/pet/pet-details.directive.html',
            controller: controller
        };
    };

    PetDetailsDirective.$inject = [];
    angular.module("tierladenApp.pet")
        .directive("tlPetDetails", PetDetailsDirective);
}(angular));