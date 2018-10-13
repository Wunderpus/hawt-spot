import React, { Component } from 'react';
import Dashboard from '../Dash/Dashboard.jsx';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accountEmail: '',
      accountPassword: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitLogIn = this.submitLogIn.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    console.log(e.target.value);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onChangeUserName(e) {
    const newState = { ...this.state };
    console.log(e.target.value);
    newState[e.target.name] = e.target.value;
    this.props.updateLoggedInUser(e.target.value);
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      loginMethod: 'registration',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      token: 'test',
    };
    fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(this.props.successfulLogin());
  }

  submitLogIn(e) {
    e.preventDefault();
    const logIn = {
      accountEmail: this.state.accountEmail,
      accountPassword: this.state.accountPassword,
    };
    console.log("login obj ", logIn)
    fetch('/users/findAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(logIn),
    })
      .then((res) => {
        console.log("res ", res)
        return res.json();
      })
      .then((verification) => {
        if (verification.userVerification) {
          this.props.successfulLogin();

        } else {
          alert('incorrect email or password');
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Log in or sign up</h1>
        <h4>Log in</h4>
        <form onSubmit={this.submitLogIn}>
          <input type="text" name="accountEmail" placeholder="Email" value={this.state.accountEmail} onChange={this.onChangeUserName} />
          <input type="text" name="accountPassword" placeholder="Password" value={this.state.accountPassword} onChange={this.onChange} />
          <input type="submit" />
        </form>
        <h4>Signup</h4>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.onChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.onChange} />
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onChangeUserName} />
          <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
