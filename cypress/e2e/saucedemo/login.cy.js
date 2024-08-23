describe('Login Tests', () => {
  const users = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'locked_out_user', password: 'secret_sauce' },
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' }
  ];

  // Se ejecuta antes de cada prueba
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/v1/');
  });

  users.forEach(user => {
    it(`Should attempt to login with ${user.username}`, () => {
      cy.get('#user-name').type(user.username);
      cy.get('#password').type(user.password);

      cy.contains('LOGIN').click();

      if (user.username === 'locked_out_user') {
        cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
      } else {
        cy.url().should('include', '/inventory.html');
      }

      if (user.username !== 'locked_out_user') {
        cy.get('.bm-burger-button').click();
        cy.get('#logout_sidebar_link').click();
      }
    });
  });
});
