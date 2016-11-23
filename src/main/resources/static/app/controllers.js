(function(angular) {
    'use strict';
    var AppController = function($scope, Pet) {
        Pet.query(function(response) {
            $scope.pets = response ? response : [];
        });

        $scope.resetPetInput = function() {
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

        $scope.addPet = function(name, category, status) {
            new Pet({
                name: name,
                category: category,
                status: status
            }).$save(function(pet) {
                $scope.pets.push(pet);
                $scope.resetPetInput();
            });
        };

        $scope.deletePet = function(pet) {
            pet.$remove(function() {
                $scope.pets.splice($scope.pets.indexOf(pet), 1);
            });
        };
    };

    AppController.$inject = ['$scope', 'Pet'];
    angular.module("tierladenApp.controllers").controller("AppController", AppController);
}(angular));