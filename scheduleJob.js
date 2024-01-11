const schedule = require('node-schedule');
const sgMail = require('@sendgrid/mail');
const axios = require("axios");
const { getNewAccessToken } = require('./middleware');
require("dotenv").config();

// Initialize SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email
const sendEmail = async (to, content, author) => {
  const msg = {
    to,
    from: 'mohit.ahuja1301@gmail.com',
    subject: 'Quote of the Day',
    html: `<strong>${content}</strong> - ${author}`,
  };

  await sgMail.send(msg);
};

const scheduleJob = async () => {

  const token = await getNewAccessToken()

  // Scheduled job to run every day at 10 am
  schedule.scheduleJob('0 10 * * *', async () => {
  
    // Fetch a random quote
    const options = {
      method: 'GET',
      url: process.env.QUOTES_URL,
      headers: {
          'X-Api-Key': process.env.QUOTES_API_KEY,
  
      }
    };
    const response = await axios.request(options);
    const subscribedUsers = await getAllSubscribedUsers(token);
  
    // Send the quote to all subscribed users
    for (const user of subscribedUsers) {
      await sendEmail(user.email, response.data[0].quote, response.data[0].author);
    }
  });
}

// Function to get all subscribed users
const getAllSubscribedUsers = async (token) => {

  // Get all the subscribed users
  var options = {
    method: 'GET',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    params: {q: 'user_metadata.isSubscribed:true'},
    headers: { authorization: `Bearer ${token.accessToken}` }
  };

  const subscribedUsers = await axios.request(options)
  return subscribedUsers.data;
};

scheduleJob()

module.exports = { scheduleJob };