(function (angular) {
    'use strict';
    var AppController = function ($scope, Pet) {
        Pet.query(function (response) {
            $scope.pets = response ? response : [];
        });

        $scope.resetPetInput = function () {
            $scope.name = "";
            $scope.category = "";
            $scope.status = "";
        };

        $scope.isValid = function (validationField) {
            if (validationField.$dirty) {
                if (validationField.$valid) {
                    return "has-success col-xs-4 col-md-4";
                } else {
                    return "has-warning col-xs-12 col-md-12";
                }
            } else {
                return "col-xs-12 col-md-12";
            }
        };

        $scope.resetErrorResponse = function () {
            $scope.errorResponse = "";
        };

        $scope.addPet = function (name, category, status) {
            new Pet({
                name: name,
                category: category,
                status: status
            }).$save(function (pet) {
                $scope.pets.push(pet);
                $scope.resetPetInput();
            }, function (errorResponse) {
                // FIXME this is hack: fix by updating message format server side.
                $scope.errorResponse = _.last(errorResponse.data.message.split("; default message [")).replace("]]", "");
                var watchRef = $scope.$watch("name", function (newVal, oldVal) {
                    if (oldVal != "" && oldVal != newVal) {
                        $scope.resetErrorResponse();
                        watchRef(); // deregistering watch
                    }
                });
            });
        };

        $scope.deletePet = function (pet) {
            pet.$remove(function () {
                $scope.pets.splice($scope.pets.indexOf(pet), 1);
            });
        };
    };

    AppController.$inject = ['$scope', 'Pet'];
    angular.module("tierladenApp.controllers").controller("AppController", AppController);
}(angular));