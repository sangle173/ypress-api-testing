/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.ts

Cypress.Commands.add('apiRequest', (method, endpoint, options = {}) => {
    const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const requestOptions = {
        method,
        url: `${baseUrl}${endpoint}`,
        headers: defaultHeaders,
        body: options.body || null,
        qs: options.query || null,
        failOnStatusCode: options.failOnStatusCode ?? true,
    };

    return cy.request(requestOptions);
});

// Extend the Cypress command type definitions
declare global {
    namespace Cypress {
        interface Chainable {
            apiRequest(
                method: string,
                endpoint: string,
                options?: {
                    headers?: Record<string, string>;
                    body?: any;
                    query?: Record<string, any>;
                    failOnStatusCode?: boolean;
                }
            ): Chainable<Response>;
        }
    }
}

Cypress.Commands.add('logRequest', (method, url, body) => {
    cy.log(`Request Method: ${method}`);
    cy.log(`Request URL: ${url}`);
    if (body) cy.log(`Request Body: ${JSON.stringify(body, null, 2)}`);
});

Cypress.Commands.add('logResponse', (response) => {
    cy.log(`Response Status: ${response.status}`);
    cy.log(`Response Body: ${JSON.stringify(response.body, null, 2)}`);
});

declare namespace Cypress {
    interface Chainable {
        logRequest(method: string, url: string, body?: object): void;
        logResponse(response: Cypress.Response<any>): void;
    }
}

