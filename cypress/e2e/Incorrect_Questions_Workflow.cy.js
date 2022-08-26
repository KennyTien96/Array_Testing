describe('Test to answer questions incorrectly, correct it', () => {
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

    // Validates additional page of identity verification form with incorrect inputs and submit
    it('Fill in SSN/DoB incorrectly', function () {
        cy.enterMonth(this.testdata.Month);
        cy.enterDay(this.testdata.Day);
        cy.enterYear(this.testdata.Year);
        cy.enterLastFourSSN(this.testdata.LastFourSSN);
        cy.clickSubmit();
    });

    // Validates incorrect answers to security questions and submit
    it('Answer security questions incorrectly', function () {
        cy.answerNumberOfQuestions(3, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates re-entry of correct answer to secuity question
    it('Answer security question correctly', function () {
        cy.answerNumberOfQuestions(1, this.testdata.SecurityAnswers);
        cy.clickSubmit();
    });

    // Validates identity confirmation page and submit
    it('Identiy confirmation page loads', function () {
        cy.get('[data-test-id=quick-view]').invoke('text').then((title) => {
            expect(title).to.eq('Identity Confirmation')
        });
        cy.clickSubmit();
    });

});

/*---------------------------------------------------------------------------------------------------------*/

describe('Test to answer all questions incorrectly', () => {
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

    // Validates additional page of identity verification form with incorrect inputs and submit
    it('Fill in SSN/DoB incorrectly', function () {
        cy.enterMonth(this.testdata.Month);
        cy.enterDay(this.testdata.Day);
        cy.enterYear(this.testdata.Year);
        cy.enterLastFourSSN(this.testdata.LastFourSSN);
        cy.clickSubmit();
    });

    // Validates incorrect answers to security questions and submit
    it('Answer security questions incorrectly', function () {
        cy.answerNumberOfQuestions(3, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates re-entry of incorrect answer to security question
    it('Second time answer security question incorrectly', function () {
        cy.answerNumberOfQuestions(1, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates re-entry once more of incorrect answers to security questions
    it('Third time answer security question correctly', function () {
        cy.answerNumberOfQuestions(5, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates answering questions incorrectly keeps redirecting to questions page in a loop
    it('Redirects to questions page after incorrect question', function () {
        cy.get('.arr-title-lg').contains('Please select the correct answers to these questions so we can verify your identity')
    });
});

/*---------------------------------------------------------------------------------------------------------*/

describe('Test to answer questions incorrectly 3 times and answer correctly', () => {
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

    // Validates additional page of identity verification form with incorrect inputs and submit
    it('Fill in SSN/DoB incorrectly', function () {
        cy.enterMonth(this.testdata.Month);
        cy.enterDay(this.testdata.Day);
        cy.enterYear(this.testdata.Year);
        cy.enterLastFourSSN(this.testdata.LastFourSSN);
        cy.clickSubmit();
    });

    // Validates incorrect answers to security questions and submit
    it('Answer security questions incorrectly', function () {
        cy.answerNumberOfQuestions(3, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates re-entry of incorrect answer to security question
    it('Second time answer security question incorrectly', function () {
        cy.answerNumberOfQuestions(1, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates re-entry once more of incorrect answers to security questions
    it('Third time answer security question incorrectly', function () {
        cy.answerNumberOfQuestions(5, this.testdata.DummySSN);
        cy.clickSubmit();
    });

    // Validates correct answers to security questions
    it('Final time answering security questions correctly', function () {
        cy.answerNumberOfQuestions(5, this.testdata.SecurityAnswers);
        cy.clickSubmit();
    });

    // Validates identity confirmation page and submit
    it('Identiy confirmation page loads', function () {
        cy.get('[data-test-id=quick-view]').invoke('text').then((title) => {
            expect(title).to.eq('Identity Confirmation')
        });
        cy.clickSubmit();
    });
});
