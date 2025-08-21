const request = require('supertest');
require('dotenv').config();

const performTransaction = async (userId, type, value, category, description, datetime) => {
    const response = await request(process.env.BASE_URL)
        .post('/api/transactions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            userId: userId,
            type: type,
            value: value,
            category: category,
            description: description,
            datetime: datetime
        }));
    return response;
}

module.exports = {
    performTransaction
}