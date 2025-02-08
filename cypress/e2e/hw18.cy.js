describe('Find Buttons', () => {
    beforeEach(() => {
        cy.login();
    });

    context("Header", () => {
        it('check the Guest LogIn Button ', () => {
            cy.get('.header_right > .header-link').should('be.visible');
        });
    
        it('check the Sign In Button ', () => {
            cy.get('.header_right > .btn').should('be.visible');
        });

        it('check the Sign In Button in Body', () => {
            cy.get('.hero-descriptor_btn').should('be.visible');
        });

    });

    context("Contacts", () => {
        it('check the Social Media Links ', () => {
            cy.get('.socials_link').each(($el) => {
                cy.wrap($el).should('be.visible');
            });
        });
    
        it('check the ithillel.ua Link ', () => {
            cy.contains('ithillel.ua').should('be.visible');
        });

        it('check the support@ithillel.ua Link ', () => {
            cy.contains('support@ithillel.ua').should('be.visible');
        });

    });

});