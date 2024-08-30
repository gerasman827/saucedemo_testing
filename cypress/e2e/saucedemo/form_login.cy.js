describe("Form login", () => {
  beforeEach(() => {
    cy.visit("/");
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
});
