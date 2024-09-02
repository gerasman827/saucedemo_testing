describe("Carrito de compras", () => {
  let data_users;
  let data_products;

  before(() => {
    cy.fixture("users").then((data) => {
      data_users = data;
    });

    cy.fixture("products").then((data) => {
      data_products = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("Agregar 6 elementos al carrito de compras", () => {
    const cantElementosCarrito = 6;
    loginUserStandard();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/inventory.html`);
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el)
        .find(".inventory_item_name")
        .invoke("text")
        .then((text) => {
          const itemName = text.trim();
          expect(itemName).to.equal(
            findProductName(data_products.products, itemName)
          );
        });

      cy.wrap($el).find(".btn_primary.btn_inventory").should("exist").click();
    });
    cy.get(".fa-layers-counter.shopping_cart_badge").should(
      "have.text",
      cantElementosCarrito
    );
  });

  function loginUserStandard() {
    const user = data_users.users.find(
      (user) => user.username === "standard_user"
    );

    if (user) {
      cy.login(user.username, user.password);
    }
  }

  function findProductName(data, productName) {
    const product = data.find((prod) => prod.name === productName);
    if (product) return product.name;
  }
});
