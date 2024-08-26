describe('Login Tests', () => {
  const users = [
    { username: 'locked_out_user', password: 'secret_sauce' },
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' }
  ];

  beforeEach(() => {
    cy.visit('/');
  });

  users.forEach(user => {
    if (user.username === 'locked_out_user') {
      it(`Debe bloquear el login para el usuario ${user.username}`, () => {
        cy.get('#user-name').type(user.username);
        cy.get('#password').type(user.password);
  
        cy.contains('LOGIN').click();
        cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
      });
    } else {
      it(`Debe poder hacer login con usuario ${user.username}`, () => {
        cy.get('#user-name').type(user.username);
        cy.get('#password').type(user.password);
  
        cy.contains('LOGIN').click();
  
        cy.url().should('include', '/inventory.html');
        cy.go('back');
      });
    }
  });
  
});
