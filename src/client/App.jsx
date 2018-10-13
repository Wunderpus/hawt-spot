import React, { Component } from 'react';
//import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dashboard.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
    this.successfulLogin = this.successfulLogin.bind(this);
  }

  successfulLogin() {
    this.setState({ ...this.state, isLoggedIn: true });
  }

  render() {
    let renderComponent = <Register successfulLogin={this.successfulLogin} />;
    if (this.state.isLoggedIn) {
      renderComponent = <Dashboard />;
    }
    return (
      <div>
        {renderComponent}
      </div>
    );
  }
}

export default App;
