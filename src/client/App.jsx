import React, { Component } from 'react';
//import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dash/Dashboard.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loggedInUser: '',
      songField: '',
      songQueryResults: [],
    };
    this.saveSong = this.saveSong.bind(this);
    this.successfulLogin = this.successfulLogin.bind(this);
    this.searchSongs = this.searchSongs.bind(this);
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
    this.updateSongField = this.updateSongField.bind(this);
  }

  saveSong(title, artist, album, url) {
    const { loggedInUser } = this.state;
    const songData = {
      user: loggedInUser,
      title,
      artist,
      album,
      url,
    };
    console.log(songData);
    fetch('/users/save-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(songData),
    })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  searchSongs() {
    const { songField } = this.state;
    fetch('/get-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ songName: songField }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        songQueryResults: data,
        songField: '',
      }))
      .catch(err => console.error(err));
  }

  successfulLogin() {
    this.setState({ ...this.state, isLoggedIn: true });
  }

  updateLoggedInUser(firstName) {
    this.setState({ ...this.state, loggedInUser: firstName })
  }

<<<<<<< HEAD
  

  searchUser() {

=======
  updateSongField(event) {
    this.setState({ songField: event.target.value });
>>>>>>> master
  }

  render() {
    const { isLoggedIn, loggedInUser, songField, songQueryResults } = this.state;
    let renderComponent = <Register updateLoggedInUser={this.updateLoggedInUser} successfulLogin={this.successfulLogin} />;
    if (isLoggedIn) {
      renderComponent = <Dashboard loggedInUser={loggedInUser} saveSong={this.saveSong} searchSongs={this.searchSongs} songField={songField} songQueryResults={songQueryResults} updateSongField={this.updateSongField} />;

    }
    return (
      <div>
        {renderComponent}
      </div>
    );
  }
}

export default App;
