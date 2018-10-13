const fetch = require('node-fetch');
const qs = require('qs');

// Access dotenv for Spotify token
require('dotenv').config();

module.exports = {
  getToken: (req, res, next) => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.SPOT_CLIENT_ID,
        client_secret: process.env.SPOT_CLIENT_SECRET,
      }),
    })
      .then(data => data.json())
      .then(data => res.locals.token = data.access_token)
      .then(data => next())
      .catch(spotErr => console.error('Error: Could Not Retrieve Data From Spotify: ', spotErr));
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
        res.locals.items = data.tracks.items;
        return res.locals.items;
      })
      .then(data => next())
      .catch(spotErr => console.error('Error: Could Not Retrieve Data From Spotify: ', spotErr));
  },

  parseSongs: (req, res, next) => {
    const songArr = [];
    res.locals.items.forEach((obj) => {
      const newSong = {};
      newSong.title = obj.name;
      newSong.artist = obj.artists[0].name;
      newSong.album = obj.album.name;
      newSong.url = obj.external_urls.spotify
      songArr.push(newSong);
    })
    res.locals.songArr = songArr;
    next();
  },
}