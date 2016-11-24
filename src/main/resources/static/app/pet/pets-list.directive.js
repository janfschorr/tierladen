(function (angular) {
    'use strict';
    var ListPetsDirective = function () {
        var controller = ['$scope', function ($scope) {
            $scope.onDeletePet = function (pet) {
                $scope.deletePet({pet: pet});
            }
        }];
        return {
            restrict: 'E',
            scope: {
                ngModel: "=",
                deletePet: "&"
            },
            templateUrl: 'app/pet/pets-list.directive.html',
            controller: controller
        };
    };
    ListPetsDirective.$inject = [];

    angular.module("tierladenApp.pet")
        .directive("tlPetsList", ListPetsDirective);
}(angular));