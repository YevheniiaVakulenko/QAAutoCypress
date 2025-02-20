import 'cypress-real-events/support';

class FuelPage {

    get emptyPanel(){
        return cy.get('.panel-page_empty');
    }

    get emptyMessage(){
        return cy.get('.panel-empty_message');
    }

    get garageLink() {
        return cy.get('.panel-empty_message a');
    }

    get expenseTable(){
        return cy.get('table.expenses_table tbody tr');
    }

    get carDropDown(){
        return cy.get('#carSelectDropdown');
    }

    get carDropDownItem(){
        return cy.get('.dropdown-item');
    }

    get addExpenseButton(){
        return cy.contains('Add an expense');
    }

    get removeButton(){
        return cy.get('.btn-delete');
    }

    get editButton(){
        return cy.get('.btn-edit');
    }

    get removeExpenseСonfirm() {
        return cy.get('.btn-danger');
    }

    get cancelButton() {
        return cy.get('.btn-secondary');
    }

    get closeButton() {
        return cy.get('.close');
    }

    //
    verifyEmptyMessage(expectedMessage) {
        this.emptyMessage.should('contain.text', expectedMessage);
    }

    clickGarageLink() {
        this.garageLink.click();
    }

    verifyTableData(date,mileage,liters,cost){
        this.expenseTable
        .should('contain',date)
        .should('contain',mileage)
        .should('contain',liters)
        .should('contain',cost);  
    }

    clickAddFuelExpenseButton(){
        this.addExpenseButton.click();
    }

    clickEditButton(){
        this.expenseTable.first().realHover();
        this.editButton.should('be.visible').click();
    }

    clickDeleteButton(){
        this.expenseTable.first().realHover();
        this.removeButton.should('be.visible').click({ force: true });
    }

    clickRemoveConfirmButton(){
        this.removeExpenseСonfirm.click();
    }

    clickCarDropDown(name){
        this.carDropDown.click();
        this.carDropDownItem.contains(name).click();
    }

}
export default new FuelPage();