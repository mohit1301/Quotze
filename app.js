require("dotenv").config();
const express = require('express')
const { auth } = require('express-openid-connect');
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))

require('./scheduleJob')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
};

app.use(auth(config));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated()
  res.locals.user = req.oidc.user
  res.locals.isSubscribed = req.oidc.user?.user_metadata?.isSubscribed ?? false
  res.locals.message = null
  next()
})

const authRouter = require("./routes/auth");
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
