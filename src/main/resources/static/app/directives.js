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
    angular.module("tierladenApp").directive("listpets", ListPetsDirective);
}(angular));