describe('Seguridad', () => {
      beforeEach(() => {
            cy.visit("/");
      });

      it('Debería poder impedir la inyección SQL de tipo DELETE', () => {
            cy.get('#login_button_container');
            cy.get('input[type="text"]').as('input');
            cy.get('@input').should('exist');
            cy.get('input[type="password"]').as('password');
            cy.get('@password').should('exist');
            cy.get('input[type="submit"]').as('submit');
            cy.get('@submit').should('exist');
            cy.get('@input').type("standard_user' OR '1'='1'; DELETE FROM users WHERE '1'='1';--");
            cy.get('@password').type('secret_sauce');
            cy.get('@submit').click();
      });

      it.only('Debería poder impedir la inyección SQL de tipo DROP', () => {
            cy.get('#login_button_container');
            cy.get('input[type="text"]').as('input');
            cy.get('@input').should('exist');
            cy.get('input[type="password"]').as('password');
            cy.get('@password').should('exist');
            cy.get('input[type="submit"]').as('submit');
            cy.get('@submit').should('exist');
            cy.get('@input').type("standard_user' OR '1'='1'; DROP TABLE users;--");
            cy.get('@password').type('secret_sauce');
            cy.get('@submit').click();
      });
});