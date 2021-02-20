const axios = require('axios');
const { BASE_API } = require('../utils/constants');

/**
 * User creation based on BasiQ API
 * @param {string} token - Authorization token
 * @returns {string} User ID
 */
async function createUser(token) {
    const params = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            email: 'gavin@hooli.com',
            mobile: '+61410888666',
            firstName: 'Joe',
            lastName: 'Bloggs'
        },
        url: `${BASE_API}/users`
    };

    try {
        const response = await axios(params);
        return response.data.id;
    } catch (err) {
        console.error(err.response.data.data);
    }
}

/**
 * Connect user to a specified bank
 * @param {string} token - Authorization token
 * @param {string} userId - User ID
 * @returns {string} Link to user transactions provider
 */
async function connectUser(token, userId) {
    const params = {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        url: `${BASE_API}/users/${userId}/connections`,
        data: {
            loginId: "gavinBelson",
            password: "hooli2016",
            institution: {
                id: "AU00000"
            }
        }
    };
    try {
        const response = await axios(params);
        return response.data.links.self;
    } catch (err) {
        console.error(err.response.data.data);
    }
}

module.exports = {
    createUser,
    connectUser
}