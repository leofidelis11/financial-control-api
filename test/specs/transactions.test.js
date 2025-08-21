const { expect } = require('chai');
require('dotenv').config();

const { performTransaction } = require('../helpers/transactions.js');

describe('Transactions', () => {
    describe('POST/api/transactions', () => {
        it('Should return status code 400 when perform transaction with value equal to zero', async () => {
            const response = await performTransaction('00a41dd9-c82f-4fd1-afcd-54c2733d6c3a', 'expense', 0, 'Food', 'Groceries');

            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Value is required and must be a positive number');
        });

        it('Should return status code 400 when perform transaction with negative value', async () => {
            const response = await performTransaction('00a41dd9-c82f-4fd1-afcd-54c2733d6c3a', 'expense', -10, 'Food', 'Groceries');

            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Value is required and must be a positive number');
        });

        it('Should return status code 400 when perform transaction with null value', async () => {
            const response = await performTransaction('00a41dd9-c82f-4fd1-afcd-54c2733d6c3a', 'expense', null, 'Food', 'Groceries');

            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Value is required and must be a positive number');
        });

        it('Should return status code 201 when perform transaction with positive value', async () => {
            const response = await performTransaction('00a41dd9-c82f-4fd1-afcd-54c2733d6c3a', 'expense', 50, 'Food', 'Groceries');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('00a41dd9-c82f-4fd1-afcd-54c2733d6c3a');
        });

        it('Should return status code 201 when perform transaction type as "income"', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'income', 1000, 'Financial Services', 'Donation');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.type).to.equal('income');
        });

        it('Should return status code 201 when perform transaction type as "expense"', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 20, 'Pet');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.type).to.equal('expense');
        });

        it('Should return status code 400 when transaction type is empty', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', '', 20, 'Pet');

            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Type is required and must be either \"income\" or \"expense\"');
        });

        it('Should return status code 400 when perform transaction type as "loan"', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'loan', 20, 'Pet');

            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Type is required and must be either \"income\" or \"expense\"');
        });

        it('Should return status code 201 when perform transaction with Food category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Food');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Food');
        });

        it('Should return status code 201 when perform transaction with Housing category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Housing');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Housing');
        });

        it('Should return status code 201 when perform transaction with Transportation category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Transportation');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Transportation');
        });

        it('Should return status code 201 when perform transaction with Education category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Education');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Education');
        });

        it('Should return status code 201 when perform transaction with Pet category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Pet');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Pet');
        });

        it('Should return status code 201 when perform transaction with Health category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Health');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Health');
        });

        it('Should return status code 201 when perform transaction with Personal category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Personal');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Personal');
        });

        it('Should return status code 201 when perform transaction with Leisure category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Leisure');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Leisure');
        });

        it('Should return status code 201 when perform transaction with Financial Services category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Financial Services');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.category).to.equal('Financial Services');
        });

        it('Should return status code 400 when perform transaction without category', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, '');

            expect(response.status).to.equal(400);
            expect(response.body.errors[0]).to.equal('Category is required and must be one of: Food, Transportation, Housing, Education, Pet, Health, Personal, Leisure, Financial Services');
        });

        it('Should return status code 201 when perform transaction without description', async () => {
            const response = await performTransaction('696057b5-1266-43f7-9b4c-c632674f00ac', 'expense', 10, 'Transportation');

            expect(response.status).to.equal(201);
            expect(response.body.userId).to.equal('696057b5-1266-43f7-9b4c-c632674f00ac');
            expect(response.body.description).to.equal('');
        });
    });
});