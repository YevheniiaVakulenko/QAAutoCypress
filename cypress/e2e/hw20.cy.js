import GaragePage from '../support/POM/garage';
import FuelPage from '../support/POM/fuel_expenses_page';
import FuelPopup from '../support/POM/fuel_expense_popup';
import SideBar from '../support/POM/sidebar';
import { formatDate } from "../support/utils"; 
const date = new Date();
describe('Successful Add car and fuel expences', () => {
    before(() => {
        cy.auth();
        cy.login();
    });
    it('check the Empty Garage', () => {
        GaragePage.garageLabel.should('be.visible');
        GaragePage.emptyPanel.should('be.visible');
    });

    it('vefify empty message on expenses with empty garage', () => {
        SideBar.ExspenseButton.click();
        FuelPage.verifyEmptyMessage('You don’t have any cars in');
        cy.go('back');
    });

    it('check successful car addition', () => {
        GaragePage.addCarFunc('Audi','TT','1');
        GaragePage.emptyPanel.should('not.exist');
        GaragePage.carList.should('be.visible');
    });

    it('verify car name', () => {
        const car_name = 'Audi TT';
        GaragePage.verifyCarName(car_name);
    });

    it('check adding expense', () => {
        GaragePage.clickaddFuelButton();
        FuelPopup.typeDate(formatDate(date));
        FuelPopup.addFuelExpense('2', '2', '2')
        cy.url().should('include', '/panel/expenses');
    });

    it('verify Expense table data', () => {
        FuelPage.expenseTable.should('be.visible');
        FuelPage.verifyTableData(formatDate(date),'2','2L','2.00 USD');
    });

    after(() => {
        FuelPage.clickDeleteButton();
        FuelPage.clickRemoveConfirmButton();
        cy.go('back');
        GaragePage.clickUpateCarInfoButton();
        GaragePage.clickRemoveCarButton();
        GaragePage.clickRemoveCarСonfirmButton();
        SideBar.LogOutButton.click();
    });
});
    
describe('Add car popup', () => {
    before(() => {
        cy.auth();
        cy.login();
        GaragePage.clickAddCarButton();
    });

    it('check adding car with blank mileage', () => {
        GaragePage.mileageInput.focus();
        GaragePage.mileageInput.blur();
        GaragePage.invalidMessage.should('have.text', 'Mileage cost required')
    });

    it('check adding car with a negative number in mileage', () => {
        GaragePage.typeMileage('-2');
        GaragePage.mileageInput.blur();
        GaragePage.invalidMessage.should('have.text', 'Mileage has to be from 0 to 999999')
    });

    it('check adding car with a number bigger than 999999 in mileage', () => {
        GaragePage.typeMileage('9999999');
        GaragePage.mileageInput.blur();
        GaragePage.invalidMessage.should('have.text', 'Mileage has to be from 0 to 999999');
        GaragePage.clickCancelButton();
    });

    it('check successful car addition', () => {
        GaragePage.addCarFunc('Audi','TT','1');
        GaragePage.emptyPanel.should('not.exist');
        GaragePage.carList.should('be.visible');
    });

    it('check cancel button', () => {
        GaragePage.clickAddCarButton();
        GaragePage.typeMileage('1');
        GaragePage.clickCancelButton();
        cy.get('.modal-content').should('not.exist');
    });

    it('check close button', () => {
        GaragePage.clickAddCarButton();
        GaragePage.typeMileage('1');
        GaragePage.clickCloseButton();
        cy.get('.modal-content').should('not.exist');
    });

    after(() => {
        GaragePage.clickUpateCarInfoButton();
        GaragePage.clickRemoveCarButton();
        GaragePage.clickRemoveCarСonfirmButton()
        SideBar.LogOutButton.click();
    });
});

describe('Update created car', () => {
    before(() => {
        cy.auth();
        cy.login();
        GaragePage.addCarFunc('Audi','TT','1');
    });

    context("Update milege on created car", () => {
        it('successful update mileage ', () => {
            GaragePage.typeMileageUpdate('2');
            GaragePage.clickUpateMileageButton()
        });
    
        it('check update button disabled with characters mileage ', () => {
            GaragePage.typeMileageUpdate('aaa');
            GaragePage.updateMileageButton.should('be.disabled');
        });
    
        it('check update button disabled with the same value mileage ', () => {
            GaragePage.typeMileageUpdate('1');
            GaragePage.updateMileageButton.should('be.disabled');
        });


    });
    context("Update info on created car", () => {
        it('successful update mileage from Edit', () => {
            GaragePage.clickUpateCarInfoButton();
            GaragePage.mileageInput.clear();
            GaragePage.typeMileage('12');
            GaragePage.mileageInput.blur();
            cy.contains('Save').click();

            GaragePage.updateMileageInput.should('have.value', '12');
        });

        it('successful update brand from Edit', () => {
            GaragePage.clickUpateCarInfoButton();
            GaragePage.selectBrand('Ford');
            cy.contains('Save').click();
            const car_name = 'Ford Fiesta';
            GaragePage.verifyCarName(car_name);
        });

        it('successful update type from Edit', () => {
            GaragePage.clickUpateCarInfoButton();
            GaragePage.selectType('Focus');
            cy.contains('Save').click();
            const car_name = 'Ford Focus';
            GaragePage.verifyCarName(car_name);
        });
    });

    after(() => {
        GaragePage.clickUpateCarInfoButton();
        GaragePage.clickRemoveCarButton();
        GaragePage.clickRemoveCarСonfirmButton()
        SideBar.LogOutButton.click();
    });
});



describe('Fuel expenses popup', () => {
    before(() => {
        cy.auth();
        cy.login();
        GaragePage.addCarFunc('Audi','TT','1');
        GaragePage.clickaddFuelButton();
    });

        it('check adding expense with blank mileage', () => {
            FuelPopup.mileageInput.clear();
            FuelPopup.mileageInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Mileage required')
        });

        it('check adding expense with a negative number in mileage', () => {
            FuelPopup.typeMileage('-2');
            FuelPopup.mileageInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Mileage has to be from 0 to 999999')
        });

        it('check adding expense with a number bigger than 999999 in mileage', () => {
            FuelPopup.typeMileage('9999999');
            FuelPopup.mileageInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Mileage has to be from 0 to 999999');
            FuelPopup.typeMileage('2');
        });

        it('check adding expense with blank number of liters', () => {
            FuelPopup.litersInput.focus();
            FuelPopup.litersInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Liters required')
        });

        it('check adding expense with a negative number in number of liters', () => {
            FuelPopup.typeLiters('-2');
            FuelPopup.litersInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Liters has to be from 0.01 to 9999')
        });

        it('check adding expense with a number bigger than 999999 in number of liters', () => {
            FuelPopup.typeLiters('9999999');
            FuelPopup.litersInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Liters has to be from 0.01 to 9999');
            FuelPopup.typeLiters('2');
        });


        it('check adding expense with blank total cost', () => {
            FuelPopup.totalCostInput.focus();
            FuelPopup.totalCostInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Total cost required')
        });


        it('check adding expense with a negative number in total cost', () => {
            FuelPopup.typeTotalCost('-2');
            FuelPopup.totalCostInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Total cost has to be from 0.01 to 1000000')
        });

        it('check adding expense with a number bigger than 999999 total cost', () => {
            FuelPopup.typeTotalCost('9999999');
            FuelPopup.totalCostInput.blur();
            FuelPopup.invalidMessage.should('have.text', 'Total cost has to be from 0.01 to 1000000')
        });

        it('check adding expense with the same milege', () => {
            FuelPopup.typeMileage('1');
            FuelPopup.typeLiters('2');
            FuelPopup.typeTotalCost('2');
            FuelPopup.totalCostInput.blur();
            FuelPage;FuelPopup.clickAddButton();
            FuelPopup.invalidAlert.should('have.text', 'First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 1')
        });

        it('check adding expense with milege less than initial', () => {
            FuelPopup.typeMileage('0');
            FuelPopup.typeLiters('2');
            FuelPopup.typeTotalCost('2');
            FuelPopup.totalCostInput.blur();
            FuelPage;FuelPopup.clickAddButton();
            FuelPopup.invalidAlert.should('have.text', 'First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 1')
        });

        it('check adding expense with future date', () => {
            const customYear = 2030;
            const testDate = formatDate(new Date(customYear, date.getMonth(), date.getDate()));

            FuelPopup.typeDate(testDate);
            FuelPopup.typeMileage('0');
            FuelPopup.typeLiters('2');
            FuelPopup.typeTotalCost('2');
            FuelPopup.totalCostInput.blur();
            FuelPage;FuelPopup.clickAddButton();
            FuelPopup.invalidAlert.should('have.text', 'Report date has to be less than tomorrow')
        });

        it('check adding expense with previous to car cration date', () => {
            const customDay = date.getDate() - 1;
            const testDate = formatDate(new Date(date.getFullYear(), date.getMonth(), customDay));

            FuelPopup.typeDate(testDate)
            FuelPopup.typeMileage('0');
            FuelPopup.typeLiters('2');
            FuelPopup.typeTotalCost('2');
            FuelPopup.totalCostInput.blur();
            FuelPage;FuelPopup.clickAddButton();
            FuelPopup.invalidAlert.should('contain','New expense date must not be less than car creation date')
        });

        it('check cancel button', () => {
            FuelPopup.clickCancelButton();
            cy.get('.modal-content').should('not.exist');
        });
    
        it('check close button', () => {
            GaragePage.clickaddFuelButton();
            FuelPopup.clickCloseButton();
            cy.get('.modal-content').should('not.exist');
        });

        it('check adding expense', () => {
            GaragePage.clickaddFuelButton();
            FuelPopup.typeDate(formatDate(date));
            FuelPopup.addFuelExpense('2', '2', '2')
            cy.url().should('include', '/panel/expenses');
        });

    after(() => {
        cy.go('back');
        FuelPopup.clickCloseButton();
        GaragePage.clickUpateCarInfoButton();
        GaragePage.clickRemoveCarButton();
        GaragePage.clickRemoveCarСonfirmButton()
        SideBar.LogOutButton.click();
    });
});

describe('Fuel expenses Page', () => {
    before(() => {
        cy.auth();
        cy.login();
        GaragePage.addCarFunc('Audi','A8','1');
        GaragePage.clickaddFuelButton();
        FuelPopup.typeMileage('2');
        FuelPopup.typeLiters('3');
        FuelPopup.typeTotalCost('2');
        FuelPopup.clickAddButton();
        cy.go('back');
        GaragePage.addCarFunc('Ford','Focus','1');
        SideBar.ExspenseButton.click();
    });

        it('verify Empty Expense message is shown when no records made', () => {
            FuelPage.verifyEmptyMessage('You don’t have any fuel expenses filed in');
        });

        it('check adding expense', () => {
            FuelPage.clickAddFuelExpenseButton();
            FuelPopup.typeMileage('2');
            FuelPopup.typeLiters('2');
            FuelPopup.typeTotalCost('2');
            FuelPopup.clickAddButton();
            FuelPage.expenseTable.should('be.visible');
        });

        it('verify Expense table data', () => {
            FuelPage.verifyTableData(formatDate(date),'2','2L','2.00 USD');
        });

        it('check edit Expense table data', () => {
            FuelPage.clickEditButton();
            FuelPopup.typeMileage('3');
            cy.contains('Save').click();
            FuelPage.verifyTableData(formatDate(date),'3','2L','2.00 USD');
        });

        it('check deleting info from table', () => {
            FuelPage.clickDeleteButton();
            FuelPage.clickRemoveConfirmButton();
        });

        it('check selecting another car', () => {
            FuelPage.clickCarDropDown("Audi");
            FuelPage.verifyTableData(formatDate(date),'2','3L','2.00 USD');
        });

    after(() => {
        FuelPage.clickDeleteButton();
        FuelPage.clickRemoveConfirmButton();
        cy.go('back');
        GaragePage.clickUpateCarInfoButton(1);
        GaragePage.clickRemoveCarButton();
        GaragePage.clickRemoveCarСonfirmButton();

        GaragePage.clickUpateCarInfoButton(0);
        GaragePage.clickRemoveCarButton();
        GaragePage.clickRemoveCarСonfirmButton()
        SideBar.LogOutButton.click();
    });
});