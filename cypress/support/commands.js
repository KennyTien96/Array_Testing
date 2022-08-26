// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('clickSubmit', () => {
    cy.get('[data-test-id=button-]').click();
});

Cypress.Commands.add('enterFirstName', (FirstName) => {
    cy.get('input[name=firstName]').type(FirstName);
});

Cypress.Commands.add('enterLastName', (LastName) => {
    cy.get('input[name=lastName]').type(LastName);
});

Cypress.Commands.add('enterAddress', (StreetAddress) => {
    cy.get('input[name=address]').type(StreetAddress);
});

Cypress.Commands.add('enterCity', (City) => {
    cy.get('input[name=city]').type(City);
});

Cypress.Commands.add('enterState', (State) => {
    cy.get('[data-test-id=select-state]').select(State);
});

Cypress.Commands.add('enterZipCode', (ZipCode) => {
    cy.get('input[name=zip]').type(ZipCode);
});

Cypress.Commands.add('enterMonth', (Month) => {
    cy.get('[data-test-id=select-null]').eq(0).select(Month);
});

Cypress.Commands.add('enterDay', (Day) => {
    cy.get('[data-test-id=select-null]').eq(1).select(Day);
});

Cypress.Commands.add('enterYear', (Year) => {
    cy.get('[data-test-id=select-null]').eq(2).select(Year);
});

Cypress.Commands.add('enterLastFourSSN', (LastFourSSN) => {
    cy.get('[data-test-id=input-ssn-enroll]').type(LastFourSSN);
});

Cypress.Commands.add('answerNumberOfQuestions', (Questions, SecurityAnswers) => {
    // Iterates through the questions
    let numberOfQuestions = Questions - 1
    for (let i = 0; i <= numberOfQuestions; i += 1) {
        let SelectedAnswer = 0;
        // Iterates through the choices in each question
        cy.get(".question-wrapper").eq(i).find('.label').each(($radiobutton) => {
            cy.get($radiobutton).invoke('text').then((text) => {
                let choice = text.toLowerCase()
                if (SecurityAnswers.includes(choice)) {
                    cy.get($radiobutton).click();
                    SelectedAnswer = 1;
                } else if ((choice == "none of the above" || choice == "none of the above/does not apply") && SelectedAnswer == 0) {
                    cy.get($radiobutton).click();
                }
            });
        });
    }
});
