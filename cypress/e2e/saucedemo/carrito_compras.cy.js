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
    add_products();

    cy.get(".fa-layers-counter.shopping_cart_badge").should(
      "have.text",
      cantElementosCarrito
    );
  });

  it("Eliminar 4 elementos del carrito de compras", () => {
    loginUserStandard();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/inventory.html`);
    add_products();
    remove_products(4);
  });

  function add_products() {
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el)
        .find(".inventory_item_name")
        .invoke("text")
        .then((text) => {
          const itemName = text.trim();
          const productAdd = findProductName(
            data_products.add_products,
            itemName
          );
          if (productAdd) {
            cy.wrap($el)
              .find(".btn_primary.btn_inventory")
              .should("exist")
              .and("be.visible")
              .contains("ADD TO CART")
              .click();
          }
        });
    });
  }

  function remove_products(amountRemove) {
    let cantRemove = 0;

    cy.get(".inventory_item")
      .each(($el) => {
        cy.wrap($el)
          .find(".inventory_item_name")
          .should("exist")
          .invoke("text")
          .then((text) => {
            const textName = text.trim();
            const productRemove = findProductName(
              data_products.remove_products,
              textName
            );

            if (productRemove) {
              cy.wrap($el)
                .find(".btn_secondary.btn_inventory")
                .should("exist")
                .and("be.visible")
                .contains("REMOVE")
                .click()
                .then(() => {
                  cantRemove++;
                });
            }
          });
      })
      .then(() => {
        expect(cantRemove).to.equal(amountRemove);
      });
  }

  function findProductName(data, productName) {
    const product = data.find((prod) => prod.name === productName);
    if (product) return product.name;
  }

  function loginUserStandard() {
    const user = data_users.users.find(
      (user) => user.username === "standard_user"
    );

    if (user) {
      cy.login(user.username, user.password);
    }
  }
});
