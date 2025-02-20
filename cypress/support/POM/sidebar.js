class SideBar{
    get GarageButton(){
        return cy.get('[routerlink="garage"]');
    }

    get ExspenseButton(){
        return cy.get('[routerlink="expenses"]');
    }

    get InstractionsButton(){
        return cy.get('[routerlink="instructions"]');
    }

    get ProfileButton(){
        return cy.get('[routerlink="profile"]');
    }

    get SettingsButton(){
        return cy.get('[routerlink="settings"]');
    }

    get LogOutButton(){
        return cy.get('.sidebar > .btn-link')
    }

}

export default new SideBar();