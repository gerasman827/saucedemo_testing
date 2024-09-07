describe("Pruebas en dispositivos móviles", () => {
  const viewports = [
    {width: 360,height: 800},
    {width: 375,height: 812},
    {width: 390,height: 844},
    {width: 768,height: 1024},
    {width: 1280,height: 800}
  ];

  let data_users;
  let data_wiewports;

  before(() => {
    cy.fixture("users").then((data) => {
      data_users = data;
    });
   /*  cy.fixture("viewports").then((data) => {
      data_wiewports = data.viewports;
    }); */
  });

  beforeEach(() => {
    cy.visit("/");
  });


  /**
   * Test navegación por el sitio 
   * con usuario standard_user
   */
  viewports.forEach((viewport) => {
    it(`Deberá poder hacer login y navegar correctamente en dispositivos
      con resolución ${viewport.width} x ${viewport.height}. Usuario: standard_user`, () => {
        loginUserStandard("standard_user");
        cy.wait(1000);
        cy.url().should('include','/v1/inventory.html');
        cy.wait(1000);
        cy.isMenuHamburguesa();
        cy.wait(1000);
        cy.get(".bm-cross-button > button").click();
        cy.wait(1000);
        cy.isMenuConEnlaces();
        cy.wait(1000);
    });
  });


  /**
   * Test de navegación por el sitio web 
   * con usuario performance_glitch_user
   */
  viewports.forEach((viewport) => {
    it(`Deberá poder hacer login y navegar correctamente en dispositivos
      con resolución ${viewport.width} x ${viewport.height}. Usuario: performance_glitch_user`, () => {
        loginUserStandard("performance_glitch_user");
        cy.wait(1000);
        cy.isMenuHamburguesa();
        cy.wait(1000);
        cy.get(".bm-cross-button > button").click();
        cy.wait(1000);
        cy.isMenuConEnlaces();
        cy.wait(1000);
    });
  });

  /**
   * Test de navegación por el sitio web 
   * con usuario problem_user
   */
  viewports.forEach((viewport) => {
    it(`Deberá poder hacer login y navegar correctamente en dispositivos
      con resolución ${viewport.width} x ${viewport.height}. Usuario: problem_user`, () => {
        loginUserStandard("problem_user");
        cy.wait(1000);
        cy.isMenuHamburguesa();
        cy.wait(1000);
        cy.get(".bm-cross-button > button").click();
        cy.wait(1000);
        cy.isMenuConEnlaces();
        cy.wait(1000);
    });
  });




  function loginUserStandard(username) {
    const user = data_users.users.find((user) => user.username === username);

    if (user) {
      cy.login(user.username, user.password);
    }
  }
});
