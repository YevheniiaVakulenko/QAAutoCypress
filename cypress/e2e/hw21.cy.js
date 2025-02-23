import GaragePage from '../support/POM/garage';
import FuelPage from '../support/POM/fuel_expenses_page';
import SideBar from '../support/POM/sidebar';
import { formatDate} from "../support/utils"; 
const date = new Date();
describe('Add car and fuel expences with API', () => {
    before(() => {
        cy.auth();
        cy.login();
        GaragePage.addCarFunc('Audi','TT','1');
    });

    it('verify created car exists', () => {
        cy.fixture('cypress.env.json').then((data) => {
            const carId = data.carId;
            cy.request('GET', '/api/cars').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data).not.be.empty;
                response.body.data.forEach(car => {
                    cy.log(`Car ID: ${car.id}`);
                  });
                const carExists = response.body.data.some(car =>
                    car.id === carId &&
                    car.brand === 'Audi' &&
                    car.model === 'TT' &&
                    car.initialMileage === 1
                );
                expect(carExists).to.be.true; 
            });
        });
    });

    it('check adding fuel expense', () => {
        cy.addExpenseviaApi();
    });

    it('verify table expense data', () => {
        SideBar.ExspenseButton.click();
        cy.fixture('cypress.env.json').then((data) => {
            const carId = data.carId;
            cy.request({
                method: 'GET',
                url: `/api/expenses?carId=${carId}&page=1`
            }).then((response) => {
                if (response.status !== 200) {
                    throw new Error(`Request failed with status code: ${response.status} and message ${response.body.data.message}`);
                  }
                expect(response.status).to.equal(200);
                expect(response.body.data).not.be.empty;
                const car = response.body.data[0];
                FuelPage.verifyTableData(formatDate(date),car.mileage,`${car.liters}L`,`${car.totalCost}.00 USD`);
            });
        });
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