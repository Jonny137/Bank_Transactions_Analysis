const axios = require('axios');
const { BASE_API } = require('../utils/constants');

/**
 * Checks status for the connected user transactions
 * @param {string} token - Authorization token
 * @param {string} url - Link to user transactions provider
 * @returns {string} Transactions preparation status url
 */
async function checkStatus(token, url) {
    const params = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        url
    };

    const response = await axios(params);
    const step = response.data.steps
        .find(step => step.title === 'retrieve-transactions');

    return step.status === 'success' ? step.result.url : step.result;
}

/**
 * Checks status for the connected user transactions
 * @param {string} token - Authorization token
 * @param {string} id - User ID
 * @param {string} nextQuery - Query for next page of fetched transactions
 * @returns {Object[]} User transactions list
 */
async function getUserTransactions(token, id, nextQuery='') {
    const params = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        url: `${BASE_API}/users/${id}/transactions${nextQuery}`
    };
    try {
        let transactionList = []
        const response = await axios(params);

        if (response.data.links.next) {
            nextQuery = `?${response.data.links.next.split('?')[1]}`;
            transactionList = response.data.data
                .concat(await getUserTransactions(token, id, nextQuery));
        } else {
            transactionList = response.data.data;
        }

        return transactionList;
    } catch (err) {
        console.error(err.response.data.data);
    }
}

/**
 * Calculate user's balance for each category in given transaction list
 * @param {Object[]} transactions - Transaction list
 */
function calculateAverage(transactions) {
    const result = transactions
        .filter(transaction => transaction.status === 'posted')
        .reduce((acc, transaction) => {
            const category = acc.find(
                value => value.code === transaction.subClass.code
            );

            if (!category) {
                acc.push({
                    code: transaction.subClass.code,
                    title: transaction.subClass.title,
                    amount: parseFloat(transaction.amount),
                    count: 1
                });
            } else {
                category.amount += parseFloat(transaction.amount);
                category.count += 1;
                acc = acc.map(
                    value => value.code === category.code ? category : value
                );
            }
            return acc;
        }, [])
        .map(transaction => ({
            ...transaction,
            average: transaction.amount / transaction.count
        }));
        
    console.log(result);
}

module.exports = {
    getUserTransactions,
    checkStatus,
    calculateAverage
}