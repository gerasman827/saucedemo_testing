describe('Login Tests', () => {

 let dataUsers; 

  before (() => {
    cy.fixture("users.json").then((data) => {
      dataUsers = data;
    })
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it(`Debe existir un formulario para login`, () => {
    cy.get('input[type="text"]')
      .should("exist")
      .and("have.attr", "placeholder", "Username");
    cy.get('input[type="password"]')
      .should("exist")
      .and("have.attr", "placeholder", "Password");
    cy.get('input[type="submit"]').should("exist").contains("LOGIN");
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

  it('Debería impedir hacer login si los campos de username y password están vacíos', () => {
    cy.login();
    cy.get('#user-name').should('have.value', "");
    cy.get('#password').should('have.value', "");
    cy.get('[data-test="error"]');
  });
  
});
