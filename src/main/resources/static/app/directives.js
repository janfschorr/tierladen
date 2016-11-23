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
            templateUrl: 'app/templates/listpets.html',
            controller: controller
        };
    };
    ListPetsDirective.$inject = [];

    var ShowPetDirective = function () {
        var controller = ['$scope', function ($scope) {
        }];
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                pet: "="
            },
            templateUrl: 'app/templates/showpet.html',
            controller: controller
        };
    };

    ShowPetDirective.$inject = [];
    angular.module("tierladenApp")
        .directive("showpet", ShowPetDirective)
        .directive("listpets", ListPetsDirective);
}(angular));