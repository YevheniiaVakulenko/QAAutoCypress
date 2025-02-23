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

import {formatAPIDate} from "../support/utils"; 

Cypress.Commands.add("auth", () => {
  const version = Cypress.env('VERSION');
  const username = Cypress.env('username');
  const password = Cypress.env('passwordAuth');
  let baseUrl;
  if (version === 'BUG') {
    baseUrl = Cypress.env('urlBug');
  } else {
    baseUrl = Cypress.env('urlNorm');
  }
    cy.visit(`https://${username}:${password}@${baseUrl}`)
  });

  Cypress.Commands.add("login", () => {
    const version = Cypress.env('VERSION');
    let email,password;
    if (version === 'BUG') {
      email = Cypress.env('emailBug');
      password = Cypress.env('passwordBug');
    } else {
      email = Cypress.env('emailNorm');
      password = Cypress.env('passwordNorm');
    }
    cy.get('.header_right > .btn').click();
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password);
    cy.contains('Login').click();
});


  Cypress.Commands.add("checkEmpty", (inputLocator,message) => {
    cy.get(inputLocator).focus();
    cy.get(inputLocator).blur();
    cy.contains(message).should('be.visible');
    cy.get(inputLocator).should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('.modal-footer > .btn').should('be.disabled');
  });

  Cypress.Commands.add("checkWrongDataInput", (inputLocator,inputData, message) => {
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

  Cypress.Commands.add("addExpenseviaApi", () => {
    const date = new Date();
    cy.fixture('cypress.env.json').then((data) => {
      const carId = data.carId;
      cy.request({
          method: 'POST',
          url: '/api/expenses',
          body: {
              carId: carId,
              reportedAt: formatAPIDate(date),
              mileage: 2,
              liters: 2,
              totalCost: 2,
              forceMileage: false
          },
        }).then((response) => {
          if (response.status !== 200) {
              throw new Error(`Request failed with status code: ${response.status} and message ${response.body.data.message}`);
            }
          expect(response.status).to.equal(200);
          expect(response.body.data).not.be.empty;
      });
    });
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