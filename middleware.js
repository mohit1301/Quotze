const axios = require('axios');
require('dotenv').config();

const checkTokenExpiration = async (req, res, next) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (!res.locals || !res.locals.token || res.locals.token.expiresAt <= currentTimestamp) {
        // Token is not present or has expired, obtain a new one
        const newToken = await getNewAccessToken();
        res.locals.token = newToken;
    }

    next();
};

const getNewAccessToken = async () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const options = {
        method: 'POST',
        url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        data: {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            grant_type: 'client_credentials',
        },
    };

    const response = await axios(options);
    return {
        accessToken: response.data.access_token,
        expiresAt: currentTimestamp + response.data.expires_in,
    };
};


module.exports = {
    checkTokenExpiration,
    getNewAccessToken
};  