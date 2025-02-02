describe('Posts API', () => {
    it('Get a post', () => {
        cy.request({
            method: 'GET',
            url: '/1',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
}); 