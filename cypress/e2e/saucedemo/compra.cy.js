describe("El carrito de compra", () => {
  let data_users;

  before(() => {
    cy.fixture("users").then((data) => {
      data_users = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it(`El carrito de compras debe estar desabilitado o bloqueado
                   hasta que se haya adicionado al menos un elemento`, () => {
    findUser("standard_user");
    cy.url().should("include", "/v1/inventory.html");
    cy.get(".shopping_cart_link").click();
    cy.url().should("not.include", "/v1/cart.html");
  });

  function findUser(username) {
    const user = data_users.users.find((user) => user.username === username);

    if (user) {
      cy.login(user.username, user.password);
    }
  }
});
