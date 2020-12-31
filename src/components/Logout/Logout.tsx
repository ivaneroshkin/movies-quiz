import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

interface LogoutProps {
  logout: () => void;
}

class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to={'/'} />;
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
