// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (user = "", password = "") => {
      if(user != "")
            cy.get('#user-name').type(user);
      if(password != "")
            cy.get('#password').type(password);
      cy.contains('LOGIN').click();
});

/**
 * Verifica si existe el menú de tipo hamburguesa
 * y además que tenga items para la navegación
 */
Cypress.Commands.add('isMenuHamburguesa', () => {
      cy.get('.bm-burger-button > button').click();
        cy.get('#inventory_sidebar_link').contains('All Items')
            .should('be.visible');
        cy.get('#about_sidebar_link').contains('About')
        .should('be.visible');
        cy.get('#logout_sidebar_link').contains('Logout')
        .should('be.visible');
});

Cypress.Commands.add('isMenuConEnlaces', () => {
      cy.get('.bm-burger-button > button').as('menu');
      cy.get('@menu').click();
      cy.get('a#inventory_sidebar_link')
            .should('have.attr', 'href', './inventory.html')
            .and('be.visible')
            .click();
      cy.get('@menu').click();
      cy.get('a#about_sidebar_link')
          .invoke('attr', 'target', '_blank')
          .should('have.attr', 'target', '_blank');
      cy.get('a#about_sidebar_link')
            .should('have.attr', 'href', 'https://saucelabs.com/')
            .and('be.visible')
            .and('exist')
            //.click();
      cy.get('a#logout_sidebar_link')
            .should('have.attr', 'href', './index.html')
            .and('be.visible')
            .click();
      
});