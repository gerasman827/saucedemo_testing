describe('Navegación - Menú hamburguesa', () => {
    beforeEach(() => {
        cy.visit("/inventory.html");
    });

    it('Deberá existir items en el Menú hamburguesa', () => {
        cy.get('.bm-burger-button > button').click();
        cy.get('#inventory_sidebar_link').contains('All Items');
        cy.get('#about_sidebar_link').contains('About');
        cy.get('#logout_sidebar_link').contains('Logout');
    });

    it('Debería ixistir por cada item un enlace href', () =>{
        cy.get('.bm-burger-button > button').as('menu');
        cy.get('@menu').click();
        cy.get('a#inventory_sidebar_link').should('have.attr', 'href', './inventory.html').click();
        cy.get('@menu').click();
        cy.get('a#about_sidebar_link')
            .invoke('attr', 'target', '_blank')
            .should('have.attr', 'target', '_blank');
        cy.get('a#about_sidebar_link').should('have.attr', 'href', 'https://saucelabs.com/').click();
        //cy.get('@menu').click();
        cy.get('a#logout_sidebar_link').should('have.attr', 'href', './index.html').click();
        cy.go('back');
    });

});