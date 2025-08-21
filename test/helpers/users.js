const request = require('supertest');
require('dotenv').config();

const createUser = async (name, email) => {
    const response = await request(process.env.BASE_URL)
            .post('/api/users/')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                name : name,
                email : email
            }));
    return response;
}

module.exports = {
    createUser
}