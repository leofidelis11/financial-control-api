const request = require('supertest');
const { expect } = require('chai');

describe('Transactions', () => {
    describe('POST/api/transactions', () => {
        it('Should return status code 400 when perform transaction with value equal to zero', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '00a41dd9-c82f-4fd1-afcd-54c2733d6c3a',
                        'type': 'expense',
                        'value': 0,
                        'category': 'Food',
                        'description': 'Grocery shopping',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors[0]).to.equal('Value is required and must be a positive number');
        });
    });
});