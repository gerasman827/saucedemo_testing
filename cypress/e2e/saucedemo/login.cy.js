describe('Login Tests', () => {
  /* const users = [
    { username: 'locked_out_user', password: 'secret_sauce' },
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' }
  ]; */

 let dataUsers; 

  before (() => {
    cy.fixture("users.json").then((data) => {
      cy.log(data);
      dataUsers = data;
    })
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', function() {
    dataUsers.users.forEach((user) => {
      if (user.username === 'locked_out_user') {
        cy.log(`Debe bloquear el login para el usuario ${user.username}`);
        cy.login(user.username, user.password);
        cy.get('[data-test="error"]')
          .should("contain","Sorry, this user has been locked out.");
      } else {
        cy.log(`Debe poder hacer login con usuario ${user.username}`);
        cy.login(user.username, user.password);
        cy.url().should("include", "/inventory.html");
        cy.go("back");
      }
    });
  });

  it('Debería no permitir hacer login con usuarios no registrados', () => {
    dataUsers.fake_users.forEach((user) => {
      cy.login(user.username, user.password);
      cy.get('button[class="error-button"]').should('be.visible');
    });
  });
  
});
