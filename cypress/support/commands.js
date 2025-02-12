// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("auth", () => {
    cy.fixture("cypress.env.json").then((env) => {
      const username = env.username;
      const password = env.password;
  
      cy.visit(`https://${username}:${password}@qauto.forstudy.space`);
    });
  });

  Cypress.Commands.add("checkEmpty", (inputLocator,message) => {
    cy.get(inputLocator).focus();
    cy.get(inputLocator).blur();
    cy.contains(message).should('be.visible');
    cy.get(inputLocator).should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('.modal-footer > .btn').should('be.disabled');
  });

  Cypress.Commands.add("checkWrongDataInput", (inputLocator,inputData, message) => {
    //cy.get(inputLocator).type(inputData);
    cy.get(inputLocator).then(($input) => {
      if ($input.attr('type') === 'password') {
          cy.wrap($input).type(inputData, { sensitive: true });
      } else {
          cy.wrap($input).type(inputData, { sensitive: false });
      }
  });
    cy.get(inputLocator).blur();
    cy.contains(message).should('be.visible');
    cy.get(inputLocator).should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('.modal-footer > .btn').should('be.disabled');
  });


  ///overwrite
  Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      options.log = false
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      })
    }
  
    return originalFn(element, text, options)
  })