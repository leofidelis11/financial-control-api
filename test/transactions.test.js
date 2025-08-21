const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Transactions', () => {
    describe('POST/api/transactions', () => {
        it('Should return status code 400 when perform transaction with value equal to zero', async () => {
            const response = await request(process.env.BASE_URL)
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

        it('Should return status code 400 when perform transaction with negative value', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '00a41dd9-c82f-4fd1-afcd-54c2733d6c3a',
                        'type': 'expense',
                        'value': -10,
                        'category': 'Food',
                        'description': 'Grocery shopping',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors[0]).to.equal('Value is required and must be a positive number');
        });

        it('Should return status code 400 when perform transaction with null value', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '00a41dd9-c82f-4fd1-afcd-54c2733d6c3a',
                        'type': 'expense',
                        'value': null,
                        'category': 'Food',
                        'description': 'Grocery shopping',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors[0]).to.equal('Value is required and must be a positive number');
        });

        it('Should return status code 201 when perform transaction with positive value', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '00a41dd9-c82f-4fd1-afcd-54c2733d6c3a',
                        'type': 'expense',
                        'value': 50,
                        'category': 'Food',
                        'description': 'Grocery shopping',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('00a41dd9-c82f-4fd1-afcd-54c2733d6c3a');
        });

        it('Should return status code 201 when perform transaction type as "income"', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'income',
                        'value': 1000,
                        'category': 'Financial Services',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.type).to.equal('income');
        });

        it('Should return status code 201 when perform transaction type as "expense"', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 20,
                        'category': 'Pet',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.type).to.equal('expense');
        });

        it('Should return status code 400 when transaction type is empty', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': '',
                        'value': 20,
                        'category': 'Pet',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors[0]).to.equal('Type is required and must be either \"income\" or \"expense\"');
        });

        it('Should return status code 400 when perform transaction type as "loan"', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'loan',
                        'value': 20,
                        'category': 'Pet',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors[0]).to.equal('Type is required and must be either \"income\" or \"expense\"');
        });

        it('Should return status code 201 when perform transaction with Food category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Food',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Food');
        });

        it('Should return status code 201 when perform transaction with Housing category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Housing',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Housing');
        });

        it('Should return status code 201 when perform transaction with Transportation category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Transportation',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Transportation');
        });

        it('Should return status code 201 when perform transaction with Education category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Education',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Education');
        });

        it('Should return status code 201 when perform transaction with Pet category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Pet',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Pet');
        });

        it('Should return status code 201 when perform transaction with Health category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Health',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Health');
        });

        it('Should return status code 201 when perform transaction with Personal category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Personal',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Personal');
        });

        it('Should return status code 201 when perform transaction with Leisure category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Leisure',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Leisure');
        });

        it('Should return status code 201 when perform transaction with Financial Services category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Financial Services',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Financial Services');
                expect(response.body.description).to.equal('');
        });

        it('Should return status code 201 when perform transaction with Financial Services category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Financial Services',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.category).to.equal('Financial Services');
        });

        it('Should return status code 400 when perform transaction without category', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': '',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors[0]).to.equal('Category is required and must be one of: Food, Transportation, Housing, Education, Pet, Health, Personal, Leisure, Financial Services');
        });

        it('Should return status code 201 when perform transaction without description', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/transactions')
                .set('Content-Type', 'application/json')
                .send({
                        'userId': '696057b5-1266-43f7-9b4c-c632674f00ac',
                        'type': 'expense',
                        'value': 10,
                        'category': 'Financial Services',
                        'datetime': '2024-01-15T10:30:00Z'                    
                });
                expect(response.status).to.equal(201);
                expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
                expect(response.body.description).to.equal('');
        });
    });
});