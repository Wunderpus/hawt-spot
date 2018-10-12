import React, { Component } from 'react';
import MainContainer from './components/MainContainer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'name',
      password: 'password',
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome to Hawt-Spot!!!</h1>
        <MainContainer username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

export default App;
