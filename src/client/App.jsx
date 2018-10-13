import React, { Component } from 'react';
//import Login from './components/Auth/Login';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dash/Dashboard.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
    this.successfullLogin = this.successfullLogin.bind(this);
  }

  successfullLogin() {
    this.setState({ ...this.state, isLoggedIn: true });
  }

  render() {
    let renderComponent = <Register successfullLogin={this.successfullLogin}/>;
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
