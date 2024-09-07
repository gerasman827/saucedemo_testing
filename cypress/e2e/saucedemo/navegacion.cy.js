describe('Navegación - Menú hamburguesa', () => {
    beforeEach(() => {
        cy.visit("/inventory.html");
    });

    it('Deberá existir items en el Menú hamburguesa', () => {
        cy.isMenuHamburguesa();
    });

    it('Deberá existir por cada item un enlace href', () =>{
       cy.isMenuConEnlaces();
    });

});