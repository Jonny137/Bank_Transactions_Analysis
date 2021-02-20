require('dotenv').config();

const { authenticate } = require('./api_auth/controller');
const { getUserTransactions,
        checkStatus, 
        calculateAverage} = require('./api_transactions/controller');
const { createUser, connectUser } = require('./api_user/controller');

const { INFO_LOG_STYLE, SUCCESS_LOG_STYLE } = require('./utils/constants');

/**
 * Main script for financial calculations of users expenditure by categories
 */
const mainScript = async () => {
    console.log(INFO_LOG_STYLE, '[INFO] Authenticating...');
    const accessToken = await authenticate();
    console.log(SUCCESS_LOG_STYLE, '[SUCCESS] Authentication successful!');

    const newUserId = await createUser(accessToken);
    const connUrl = await connectUser(accessToken, newUserId);
    console.log(SUCCESS_LOG_STYLE, '[SUCCESS] User connected!\n');

    console.log(INFO_LOG_STYLE, '[INFO] Fetching user transactions...');
    const intervalId = setInterval(async () => {
        const status = await checkStatus(accessToken, connUrl);

        if (status) {
            clearInterval(intervalId);
            console.log(SUCCESS_LOG_STYLE, 
                        '[SUCCESS] Transactions fetched successfully!\n');
            console.log(INFO_LOG_STYLE, 
                        '[INFO] Calculating average balance...');
            const transactions = await getUserTransactions(
                accessToken,
                newUserId
            );
            console.log(INFO_LOG_STYLE, 
                        '[INFO] Average balance for each category:');
            calculateAverage(transactions);
        }
        
    }, 10000);
}

(async () => {
    await mainScript()
})()