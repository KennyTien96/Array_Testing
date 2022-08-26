describe('Test to enroll properly with test data, credit score page loading, and logging out', () => {
    beforeEach(function () {
        cy.fixture('form_data').then(function(testdata) {
            this.testdata = testdata
        });
    });

    // Validates signup form page loads
    it('Signup page loads', function () {
        cy.visit('https://whitelabel.sandbox.array.io/signup?platform=v3');
        cy.get('[data-test-id=account-details-title]').invoke('text').then((title) => {
            expect(title).to.eq('Verify Your Identity')
        });
    });

    // Validates first page of identify verification form inputs and submit
    it('Fill in identity verification form', function () {
        cy.enterFirstName(this.testdata.FirstName);
        cy.enterLastName(this.testdata.LastName);
        cy.enterAddress(this.testdata.StreetAddress);
        cy.enterCity(this.testdata.City);
        cy.enterState(this.testdata.State);
        cy.enterZipCode(this.testdata.ZipCode);
        cy.clickSubmit();
    });

    // Validates additional page of identity verification form inputs and submit
    it('Fill in additional information', function () {
        cy.enterMonth(this.testdata.Month);
        cy.enterDay(this.testdata.Day);
        cy.enterYear(this.testdata.Year);
        cy.enterLastFourSSN(this.testdata.LastFourSSN);
        cy.clickSubmit();
    });

    // Validates security questions and submit
    it('Answer security questions', function () {
        cy.answerNumberOfQuestions(3, this.testdata.SecurityAnswers);
        cy.clickSubmit();
    });

    // Validates identity confirmation page and submit
    it('Identiy confirmation page loads', function () {
        cy.get('[data-test-id=quick-view]').invoke('text').then((title) => {
            expect(title).to.eq('Identity Confirmation')
        });
        cy.get('[data-test-id=button-]').click();
    });

    // Validates credit score page is loading properly
    it('Credit score page loads', function() {
        cy.get('.title', {timeout:150000}).contains(this.testdata.FullName)
    });

    // Validates logging out
    it('Logging out', function() {
        cy.contains('.menuLink', 'Settings').realHover()
        cy.contains('.submenu', 'Log out').click()
    });

    // Validates log out redirects to log in page
    it('Redirects to login page', function() {
        cy.get('.heading').contains('Login to account');
    });

});
