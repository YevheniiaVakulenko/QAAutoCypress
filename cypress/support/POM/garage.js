class GaragePage {
    //elements of page
    get garageLabel(){
        return cy.contains('Garage');
    }
    get emptyPanel(){
        return cy.get('.panel-page_empty');
    }
    get addCarButton() {
        return cy.contains('Add car');
    }

    //elements of add car pop-up
    get mileageInput() {
      return cy.get('#addCarMileage');
    }

    get cancelButton() {
        return cy.get('.modal-footer > .btn-secondary')
    }

    get closeButton() {
        return cy.get('.close > span');
    }
    
    get addButton() {
        return cy.get('.modal-footer > .btn-primary');
    }

    get invalidMessage() {
        return cy.get('.invalid-feedback');
    }

    //elements of car info
    get carList(){
        return cy.get('.car-list');
    }

    get carName(){
        return cy.get('.car_name');
    }

    get addFuelButton(){
        return cy.contains('Add fuel expense');
    }

    get updateCarInfoButton(){
        return cy.get('.car_edit')
    }
    
    get updateMileageInput(){
        return cy.get('[formcontrolname="miles"]');
    }

    get updateMileageButton(){
        return cy.get('.update-mileage-form_submit')
    }

    get updateMileageDate(){
        return cy.get('.car_update-mileage');
    }

    
    get carCreationDateInput() {
        return cy.get('#carCreationDate');
    }

    get carCreationDateButton() {
        return  cy.get('.input-group-append > .btn');
    }

    get removeCarButton() {
        return cy.get('.btn-outline-danger');
    }

    get removeCarСonfirm() {
        return cy.get('.btn-danger');
    }

    verifyCarName(expectedCarName){
        this.carName.should('contain',`${expectedCarName}`)
    }

    verifyUpdateMileageDate(expectedDate){
        this.updateMileageDate.should('contain',`${expectedDate}`)
    }

    selectBrand(optionText) {
         return cy.get('#addCarBrand', { timeout: 5000 })
         .select(optionText)
         .trigger('change')
         .wait(1000);
    }

    selectType(optionText) {
        return cy.get('#addCarModel').select(optionText).trigger('change');
    }

    typeMileage(mileage) {
    this.mileageInput.clear();
      this.mileageInput.type(mileage);
      return this;
    }
  
    typeMileageUpdate(mileage) {
        this.updateMileageInput.clear();
        this.updateMileageInput.type(mileage);
        this.updateMileageInput.blur();
        return this;
    }

    typeCreationDateInputUpdate(date) {
        this.carCreationDateInput.clear();
        this.carCreationDateInput.type(date);
        return this;
    }

    clickaddFuelButton(){
        this.addFuelButton.click();
    }

    clickCarCreationDateButton(date) {
        this.carCreationDateButton.click();
        cy.get(`[aria-label="${date}"] > .btn-light`).click();
    }

    clickUpateMileageButton() {
        this.updateMileageButton.click();
    }

    clickUpateCarInfoButton(index=0) {
        this.updateCarInfoButton.eq(index).click();
    }

    clickAddCarButton() {
      this.addCarButton.click();
    }

    clickAddButton() {
        this.addButton.click();
    }

    clickRemoveCarButton(){
        this.removeCarButton.click();
    }
    
    clickRemoveCarСonfirmButton(){
        this.removeCarСonfirm.click();
    }

    clickCancelButton() {
        this.cancelButton.click();
    }

    clickCloseButton() {
        this.closeButton.click();
    }

    addCarFunc(brand, type, mileage){
        cy.intercept('POST', '/api/cars').as('addCar');

        this.clickAddCarButton();
        this.selectBrand(brand);
        this.selectType(type);
        this.typeMileage(mileage);
        this.clickAddButton();
        cy.wait('@addCar').then((interception) => {
            const responseBody = interception.response.body;
            expect(responseBody.status).to.eq('ok');
            const carId = responseBody.data.id;
            expect(carId).to.exist; 
            cy.writeFile('cypress/fixtures/cypress.env.json', { carId: carId })
        });
    }
  }
  
  export default new GaragePage();