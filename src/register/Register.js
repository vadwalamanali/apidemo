import React, { Component } from 'react';
import AuthContext from '../authContext/AuthContext';
import './Register.css';

class Register extends Component {
  render() {
      return (
        <div className="registerWrapper">
          <h1>Login</h1>
          <form action="#" method="get" autoComplete="off">
              <label>Email:</label>
              <input type="email" id="email"/>
              <label>Password:</label>
              <input type="password" id="password"/>
              <AuthContext.Consumer>
              {(context) => <button onClick={context.login}>login</button>}
              </AuthContext.Consumer>
          </form>
        </div>
      )
  }
}
export default Register;
