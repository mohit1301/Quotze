const express = require('express');
const Router = express.Router();
const axios = require('axios');
const { checkTokenExpiration } = require('../middleware')
require('dotenv').config();

Router.get('/', (req, res) => {
  res.render('dashboard');
});

Router.get('/dashboard', (req, res) => {
  const subscribed = req.query.subscribed ?? null;
  const unsubscribed = req.query.unsubscribed ?? null;
  let message = req.query.message ?? ''
  let isSubscribed = null;
  if (subscribed) {
    message = 'You have successfully subscribed to receive daily quotes!';
    isSubscribed = true;
  } else if (unsubscribed) {
    message = 'You have successfully unsubscribed!';
  }
  res.render('dashboard', { message, isSubscribed });
});

Router.get('/quote', (req, res) => {
  res.render('index', { api_key: process.env.QUOTES_API_KEY, api_url: process.env.QUOTES_URL });
});

Router.get('/confirm-email', (req, res) => {
  res.render('email', { action: '/email', operation: true });
});

Router.get('/confirm-unsubscribe-email', (req, res) => {
  res.render('email', { action: '/unsubscribe', operation: false });
});

Router.post('/email', checkTokenExpiration, async (req, res) => {
  try {
    //update user metadata using the provided access token
    const userUpdateOptions = {
      method: 'PATCH',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.oidc.user.sub}`,
      headers: { authorization: `Bearer ${res.locals.token.accessToken}`, 'content-type': 'application/json' },
      data: { user_metadata: { isSubscribed: true } },
    };

    await axios.request(userUpdateOptions);

    res.redirect('/dashboard?subscribed=1');
  } catch (error) {
    console.error('Error updating user metadata:', error);
    res.redirect('/dashboard?message=An_Error_occured');
  }
});

Router.post('/unsubscribe', checkTokenExpiration, async (req, res) => {
  try {
    //unsubscribe the user
    const userUpdateOptions = {
      method: 'PATCH',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.oidc.user.sub}`,
      headers: { authorization: `Bearer ${res.locals.token.accessToken}`, 'content-type': 'application/json' },
      data: { user_metadata: { isSubscribed: false } },
    };

    await axios.request(userUpdateOptions);

    res.redirect('/dashboard?unsubscribed=1');
  } catch (error) {
    console.error('Error updating user metadata:', error);
    res.redirect('/dashboard?message=An_Error_occured');
  }

});

module.exports = Router;
