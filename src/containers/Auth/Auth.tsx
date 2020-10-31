import React, { Component } from 'react';
import classes from './Auth.module.css';

interface AuthProps {}
interface AuthState {}

class Auth extends Component<AuthProps, AuthState> {
  state = {};

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthWrapper}>
          <h2>Auth</h2>
        </div>
      </div>
    );
  }
}

export default Auth;
