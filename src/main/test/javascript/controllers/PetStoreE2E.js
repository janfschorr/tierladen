describe('Protractor Petstore App', function() {
    var submitButton = element(by.partialButtonText('Add'));
    var nameInput = element(by.model('name'));
    var petList = element.all(by.repeater('pet in ngModel'));

    beforeEach(function () {
        browser.get('http://localhost:8999/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Tierladen Pet Store');
    });

    it('starts with submit disabled', function () {
        expect(submitButton.isEnabled()).toBe(false);
    });

    it('keeps submit disabled when invalid name entered', function () {
        nameInput.sendKeys("DG");
        expect(submitButton.isEnabled()).toBe(false);
    });

    it('enables submit when valid name entered', function () {
        nameInput.sendKeys("RANDOMDOG");
        expect(submitButton.isEnabled()).toBe(true);
    });

    it('adds pet after successful submit', function () {
        nameInput.sendKeys("RANDOMDOG");
        expect(petList.count()).toEqual(0);
        submitButton.click();

        expect(petList.count()).toEqual(1);
        // CLEAN UP
        petList.get(0).element(by.tagName('button')).click();
    });

    it('removes first pet if delete is clicked', function () {
        expect(petList.count()).toEqual(0);
        nameInput.sendKeys("RANDOMDOG");
        submitButton.click();

        expect(petList.count()).toEqual(1);
        petList.get(0).element(by.tagName('button')).click();
        expect(petList.count()).toEqual(0);
    });
});