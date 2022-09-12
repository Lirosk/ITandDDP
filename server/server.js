const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { loginUser, requestAccessToken, refreshAccessToken } = require('./api');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let credentials = {};

const clientId = '706b7ab1e375491da3603f6f52df368c'

app.post('/authorize', (req, res) => {
    const redirectUri = req.body.redirectUri;
    loginUser(
        clientId,
        redirectUri,
    ).then(urlAndCreds => {
        credentials = urlAndCreds.credentials;
        res.json({
            url: urlAndCreds.url
        });
    });
});

app.post('/token', (req, res) => {
    const code = req.body.code;
    credentials.code = code;
    requestAccessToken(credentials).then(tokens => {
        res.json(tokens);
    }).catch(error => {
        console.log({ error });
        res.sendStatus(400);
    });
});

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const accessToken = req.body.accessToken;
    const tokenType = req.body.tokenType;

    refreshAccessToken(tokenType, accessToken, refreshToken, clientId).then(data => {
        res.json({
            data
        });
    }).catch(error => {
        console.log({ error });
        res.sendStatus(400);
    });
});

app.listen(3001);