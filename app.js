const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// AUTHENTICATION
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

// DATABASE (Fauna)
const faunadb = require("faunadb"), q = faunadb.query;
const client = new faunadb.Client({secret: process.env.FAUNADB_SECRET_KEY});

// ROUTES
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get("/callback", (req, res) => {
    res.send({data: "You are in the shop"});
});

app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get("/shop", async(req, res) => {
    try {
        // const createP = await client.query(
        const products = await client.query (
            // q.Create(q.Collection('products'), { data: { testField: 'testValue' } })
            q.Map(
                q.Paginate(q.Documents(q.Collection("products"))),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )

        res.status(200).json(products)
        // console.log(createP);
    } catch (error) {
        // console.log(error);
        res.status(500).json({error: error.description})
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Starting server on ", PORT)
});