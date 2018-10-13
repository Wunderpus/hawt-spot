const fetch = require('node-fetch');

// Access dotenv for Spotify token
require('dotenv').config();

module.exports = {
  getToken: (req, res, next) => {
    console.log('spot id:', process.env.SPOT_CLIENT_ID);
    console.log('spot secret:', process.env.SPOT_CLIENT_SECRET);
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        grant_type: 'client_credentials',
        client_id: process.env.SPOT_CLIENT_ID,
        client_secret: process.env.SPOT_CLIENT_SECRET,
      },
    })
      .then(data => data.json())
      .then((data) => {
        res.locals.token = data['access_token'];
        console.log(data);
        return data;
      })
      .then(next())
      .catch(spotErr => console.log('Error: Could Not Retrieve Data From Spotify: ', spotErr));
  },

  getSongs: (req, res, next) => {
    const { songName } = req.body;
    const spotURL = new URL('https://api.spotify.com/v1/search');
    const params = {
      q: songName,
      type: 'track',
      market: 'US',
    };
    spotURL.search = new URLSearchParams(params);
    fetch(spotURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${res.locals.token}`,
      },
    })
      .then(data => data.json())
      .then((data) => {
        res.locals.items = data.tracks.href.items;
        console.log(res.locals.items);
        return res.locals.items;
      })
      .then(next())
      .catch(spotErr => console.log('Error: Could Not Retrieve Data From Spotify: ', spotErr));
  },

  parseSongs: (req, res, next) => {
    next();
  },
}