(function(angular) {
    var AppController = function($scope, Pet) {
        Pet.query(function(response) {
            $scope.pets = response ? response : [];
        });

        $scope.addPet = function(name, category, status) {
            new Pet({
                name: name,
                category: category,
                status: status
            }).$save(function(pet) {
                $scope.pets.push(pet);
            });
            $scope.newPet = "";
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