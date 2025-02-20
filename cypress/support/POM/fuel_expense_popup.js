class FuelPopup {
    get vehicleDropDown(){
        return cy.get('#addExpenseCar');
    }
    get mileageInput(){
        return cy.get('[formcontrolname="mileage"]');
    }
    get dateInput(){
        return cy.get('[formcontrolname="reportedAt"]');
    }
    get litersInput(){
        return cy.get('[formcontrolname="liters"]');
    }
    get totalCostInput(){
        return cy.get('[formcontrolname="totalCost"]');
    }

    get cancelButton() {
        return cy.get('.modal-footer > .btn-secondary');
    }

    get closeButton() {
        return cy.get('.close');
    }
    
    get addButton() {
        return cy.get('.modal-footer > .btn-primary')
    }
    get invalidMessage() {
        return cy.get('.invalid-feedback');
    }

    get invalidAlert() {
        return cy.get('.alert');
    }

    typeMileage(mileage) {
        this.mileageInput.clear();
        this.mileageInput.type(mileage);
        return this;
    }

    typeDate(date) {
        this.dateInput.clear();
        this.dateInput.type(date);
        return this;
    }

    typeLiters(liters) {
        this.litersInput.clear();
        this.litersInput.type(liters);
        return this;
    }

    typeTotalCost(cost) {
        this.totalCostInput.clear();
        this.totalCostInput.type(cost);
        return this;
    }

    clickAddButton() {
        this.addButton.click();
    }
    
    clickCancelButton() {
        this.cancelButton.click();
    }

    clickCloseButton() {
        this.closeButton.click();
    }

    addFuelExpense(mileage, liters, cost){
        this.typeMileage(mileage);
        this.typeLiters(liters);
        this.typeTotalCost(cost);
        this.clickAddButton();
    }
}
export default new FuelPopup();