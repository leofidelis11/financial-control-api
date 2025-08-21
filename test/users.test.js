const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Users', () => {
    describe('GET/api/users', () => {
        it('Should return 200 status code and correct amount when perform check balance', async () => {
            const userId = `cfd4a03a-bf7b-4a3d-91c0-9c2933efc728`
        
            const response = await request(process.env.BASE_URL)
            .get(`/api/users/${userId}/balance`)
            .set('Content-Type', 'application/json');
            
            expect(response.status).to.equal(200);
            expect(response.body.income).to.equal(10000);
            expect(response.body.expenses).to.equal(2800);
            expect(response.body.balance).to.equal(7200);

        });
    });

    describe('POST/api/users', () => {
        it('Should return 400 status code when create new user without e-mail', async () => {        
            const response = await request(process.env.BASE_URL)
            .post('/api/users/')
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Joana Darc',
                'email': ''
            });
            
            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Email is required and must be a non-empty string');
        });

        it('Should return 201 status code when create new user with valid credentials', async () => {        
            const response = await request(process.env.BASE_URL)
            .post('/api/users/')
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Joana Darc',
                'email': 'joanadarc@example.com'
            });
            
            expect(response.status).to.equal(201);
            expect(response.body.email).to.equal('joanadarc@example.com');

            //delete user
            const userId = response.body.id
            await request(process.env.BASE_URL)
            .delete(`/api/users/${userId}`)
            .set('Content-Type', 'application/json');
        });
    });
});