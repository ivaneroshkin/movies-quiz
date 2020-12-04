import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

interface LogoutProps {
  logout: any;
}

class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to={'/'} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
