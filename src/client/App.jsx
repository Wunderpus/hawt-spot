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
    };
    this.successfulLogin = this.successfulLogin.bind(this);
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
  }

  successfulLogin() {
    this.setState({ ...this.state, isLoggedIn: true });
  }

  updateLoggedInUser(firstName) {
    this.setState({ ...this.state, loggedInUser: firstName })
  }

  render() {
    let renderComponent = <Register updateLoggedInUser={this.updateLoggedInUser} successfulLogin={this.successfulLogin} />;
    if (this.state.isLoggedIn) {
      renderComponent = <Dashboard loggedInUser={this.state.loggedInUser} />;
    }
    return (
      <div>
        {renderComponent}
      </div>
    );
  }
}

export default App;
