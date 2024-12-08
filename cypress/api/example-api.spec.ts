// cypress/api/example-api.spec.ts
describe('Custom API Request', () => {
    it('GET request with baseURL and headers', () => {
        cy.apiRequest('GET', '/posts/1', {
            headers: { Authorization: 'Bearer token' },
        }).then((response) => {
            cy.log('step 1')
            cy.logResponse(response);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 2);
        });
    });

    it('POST request with JSON body', () => {
        cy.apiRequest('POST', '/posts', {
            body: {
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
        }).then((response) => {
            cy.logResponse(response);
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('id');
        });
    });
    it('DEmo request with JSON body', () => {
        cy.apiRequest('POST', '/posts', {
            body: {
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
        }).then((response) => {
            cy.logResponse(response);
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
    });
});
