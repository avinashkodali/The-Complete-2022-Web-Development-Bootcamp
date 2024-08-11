const express = require('express');
const axios = require('axios');
const qs = require('qs');

const app = express();
const port = 5000;

const CLIENT_ID = '1083993418118-t1feivpv1rre7htqj8vjsqpjivs4314h.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5000/auth/callback';

app.get('/auth/google', (req, res) => {
  const googleAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
  };

  res.redirect(`${googleAuthURL}?${new URLSearchParams(params).toString()}`);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  const tokenResponse = await axios.post(
    'https://oauth2.googleapis.com/token',
    qs.stringify({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const { access_token } = tokenResponse.data;

  const userInfoResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
  );
  console.log(userInfoResponse.data);
  res.send(userInfoResponse.data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
