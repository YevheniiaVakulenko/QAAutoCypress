const email = `testemail+${Date.now()}@gmail.com`;
describe('Registration', () => {
    beforeEach(() => {
        cy.auth();
        cy.get('.header_right > .btn').click();
        cy.get('.modal-footer > .btn-link').click();
    });

    context("Positive", () => {
        it('Register ', () => {
            cy.get('#signupName').type('PaulPaul');
            cy.get('#signupLastName').type('PaulPaul');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type('L234567891l');
            cy.get('#signupRepeatPassword').type('L234567891l');
            cy.get('.modal-footer > .btn').click();
            cy.get('.modal-content').should('not.exist');
        });
    });

    context("Empty input", () => {
        it('Check Empty Name ', () => {
            cy.checkEmpty('#signupName','Name required');
        });
        it('Check Empty Last Name', () => {
            cy.checkEmpty('#signupLastName','Last name required');
        });
        it('Check Empty Email ', () => {
            cy.checkEmpty('#signupEmail','Email required');
        });
        it('Check Empty Password ', () => {
            cy.checkEmpty('#signupPassword','Password required');
        });
        it('Check Empty Re-enter password ', () => {
            cy.checkEmpty('#signupRepeatPassword','Re-enter password required');
        });
    });

    context("Wrong Data Name input", () => {
        it('Check Name length less that 2', () => {
            cy.checkWrongDataInput('#signupName','a' ,'Name has to be from 2 to 20 characters long');
        });
        it('Check Name length more that 20', () => {
            cy.checkWrongDataInput('#signupName','aaaaaaaaaaaaaaaaaaaaa' ,'Name has to be from 2 to 20 characters long');
        });
        it('Check Name with numbers', () => {
            cy.checkWrongDataInput('#signupName','a1' ,'Name is invalid');
        });
        it('Check Name with special characters', () => {
            cy.checkWrongDataInput('#signupName','a&' ,'Name is invalid');
        });
    });

    context("Wrong Data Last Name input", () => {
        it('Check Last Name length less that 2', () => {
            cy.checkWrongDataInput('#signupLastName','a' ,'Last name has to be from 2 to 20 characters long');
        });
        it('Check Last Name length more that 20', () => {
            cy.checkWrongDataInput('#signupLastName','aaaaaaaaaaaaaaaaaaaaa' ,'Last name has to be from 2 to 20 characters long');
        });
        it('Check Last Name with numbers', () => {
            cy.checkWrongDataInput('#signupLastName','a1' ,'Last name is invalid');
        });
        it('Check Last Name with special characters', () => {
            cy.checkWrongDataInput('#signupLastName','a&' ,'Last name is invalid');
        });
    });

    context("Wrong Data Email input", () => {
        it('Check Email without @', () => {
            cy.checkWrongDataInput('#signupEmail','johnexample.com' ,'Email is incorrect');
        });
        it('Check Email without domain', () => {
            cy.checkWrongDataInput('#signupEmail','john@.com' ,'Email is incorrect');
        });
        it('Check Email without .com', () => {
            cy.checkWrongDataInput('#signupEmail','john@example' ,'Email is incorrect');
        });
    });

    context("Wrong Data Password input", () => {
        it('Check Password length less that 8', () => {
            cy.checkWrongDataInput('#signupPassword','aA1bcd' ,'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });
        it('Check Password length more that 15', () => {
            cy.checkWrongDataInput('#signupPassword','A1b2c3d4e5f6g7h8i' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Password with numbers only', () => {
            cy.checkWrongDataInput('#signupPassword','12345678' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Password with characters only', () => {
            cy.checkWrongDataInput('#signupPassword','aaaaaaaA' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Password with no uppercase letters', () => {
            cy.checkWrongDataInput('#signupPassword','password1' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Password with no lowercase letters', () => {
            cy.checkWrongDataInput('#signupPassword','PASSWORD1' ,'Password has to be from 8 to 15 characters');
        });
    });

    context("Wrong Data Re-enter Password input", () => {
        it('Check Re-enter Password length less that 8', () => {
            cy.checkWrongDataInput('#signupRepeatPassword','aA1bcd' ,'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });
        it('Check Re-enter Password length more that 15', () => {
            cy.checkWrongDataInput('#signupRepeatPassword','A1b2c3d4e5f6g7h8i' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Re-enter Password with numbers only', () => {
            cy.checkWrongDataInput('#signupRepeatPassword','12345678' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Re-enter Password with characters only', () => {
            cy.checkWrongDataInput('#signupRepeatPassword','aaaaaaaA' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Re-enter Password with no uppercase letters', () => {
            cy.checkWrongDataInput('#signupRepeatPassword','password1' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Re-enter Password with no lowercase letters', () => {
            cy.checkWrongDataInput('#signupRepeatPassword','PASSWORD1' ,'Password has to be from 8 to 15 characters');
        });
        it('Check Re-enter Password not matched with Password', () => {
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password2').blur();
            cy.contains('Passwords do not match').should('be.visible');
            cy.get('.modal-footer > .btn').should('be.disabled');
        });
    });

});