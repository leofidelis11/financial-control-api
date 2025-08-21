const request = require('supertest');
require('dotenv').config();

const checkBalance = async (userId) => {
    const response = await request(process.env.BASE_URL)
        .get(`/api/users/${userId}/balance`)
        .set('Content-Type', 'application/json');
    return response;
}

const createUser = async (name, email) => {
    const response = await request(process.env.BASE_URL)
        .post('/api/users/')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            name: name,
            email: email
        }));
    return response;
}

const deleteUser = async (userId) => {
    await request(process.env.BASE_URL)
        .delete(`/api/users/${userId}`)
        .set('Content-Type', 'application/json');
}

module.exports = {
    checkBalance,
    createUser,
    deleteUser
}