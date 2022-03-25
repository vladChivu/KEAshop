const express = require("express");
const app = express();

app.use(express.static("public"));

const { auth } = require("express-openid-connect");
require('dotenv').config();
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
  };
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
const { requiresAuth } = require("express-openid-connect");

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get("/callback", (req, res) => {
    res.send({data: "You are in the shop"});
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Starting server on ", PORT)
});