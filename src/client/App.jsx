import React, { Component } from 'react';
//import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dash/Dashboard.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      songField: '',
      songQuery: {},
    };
    this.successfullLogin = this.successfullLogin.bind(this);
    this.searchSongs = this.searchSongs.bind(this);
    this.updateSongField = this.updateSongField.bind(this);
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
      .then(this.setState({ songField: '' }));
  }

  successfullLogin() {
    const URI = `https://api.spotify.com/v1/search?q=immigrant&type=track&market=US`
    this.setState({ ...this.state, isLoggedIn: true });
  }

  updateSongField(event) {
    console.log(event.target.value);
    this.setState({ songField: event.target.value });
  }

  render() {
    const { songField } = this.state;
    let renderComponent = <Register successfullLogin={this.successfullLogin}/>;
    if (this.state.isLoggedIn) {
      renderComponent = <Dashboard searchSongs={this.searchSongs} songField={songField} updateSongField={this.updateSongField} />;
    }
    return (
      <div>
        {renderComponent}
      </div>
    );
  }
}

export default App;
