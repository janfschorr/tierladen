describe('The application controller', function() {
    var $scope, factory, saveCallback, queryCallback;

    var PET1 = {
        id: 1,
        name: 'Wuffy',
        category: 'Dog',
        status: 'available',
        $remove: function(callback) {
            callback();
        }
    }, PET2 = {
        id: 2,
        name: 'Miauzi',
        category: 'Cat',
        status: 'pending',
        $remove: function(callback) {
            callback();
        }
    }, NAME = "A name", CATEGORY = "A category", STATUS = "A status";

    beforeEach(module('tierladenApp.controllers'));
    beforeEach(inject(function($controller, $rootScope) {
        factory = function() { };
        factory.prototype.$save = function(cb) {
            saveCallback = cb;
        };
        factory.query = function(cb) {
            queryCallback = cb;
        };

        $scope = $rootScope.$new();
        $controller('AppController', {
            '$scope': $scope,
            'Pet': factory
        });
    }));

    it('should have correct pets', function() {
        // When pet1 and pet2 are returned from service
        queryCallback([PET1, PET2]);

        expect($scope.pets).toContain(PET1);
        expect($scope.pets).toContain(PET2);
        expect($scope.pets.length).toBe(2);
    });

    it('should clear the textfield when adding a new pet', function() {
        // When the new description is entered inside the textbox
        $scope.name = NAME;
        $scope.addPet(NAME, CATEGORY, STATUS);

        expect($scope.name).toBe("");
    });

    it('should save the pet when adding a new pet', function() {
        // When saving an pet returns the persisted result
        $scope.pets = [];
        $scope.addPet(NAME);
        saveCallback(PET1);

        expect($scope.pets).toContain(PET1);
        expect($scope.pets.length).toBe(1);
    });

    it('should remove the pet from the list when it\'s deleted', function() {
        // When there are two pets and PET1 is removed
        $scope.pets = [PET1, PET2];
        $scope.deletePet(PET1);

        expect($scope.pets.length).toBe(1);
        expect($scope.pets).toContain(PET2);
        expect($scope.pets).not.toContain(PET1);
    });
});