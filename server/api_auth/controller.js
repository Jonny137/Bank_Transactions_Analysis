const axios = require('axios');
const { BASE_API } = require('../utils/constants');

/**
 * Authentication API necessary for interaction with BasiQ API
 * @returns {string} Authorization token
 */
async function authenticate() {
    const params = {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${process.env.API_KEY}`,
            'basiq-version': '2.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${BASE_API}/token`
    };

    try {
        const response = await axios(params);
        return response.data.access_token;
    } catch (err) {
        console.error(err.response.data.data);
    }
}

module.exports = {
    authenticate
}