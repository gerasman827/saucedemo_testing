describe("Form login", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/");
  });

  it(`Debe existir un formulario para login`, () => {
    cy.get("#user-name")
      .should("exist")
      .and("have.attr", "placeholder", "Username");
    cy.get("#password")
      .should("exist")
      .and("have.attr", "placeholder", "Password");
    cy.get("#login-button").should("exist").contains("LOGIN");
  });
});
