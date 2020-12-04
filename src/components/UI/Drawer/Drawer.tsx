import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.module.css';

import Button from '../Button/Button';
import Backdrop from '../Backdrop/Backdrop';

interface DrawerProps {
  isAuthenticated: boolean;
  isOpen: boolean;
  onClose: any;
}
interface DrawerState {}

interface Link {
  to: string;
  label: string;
  exact: boolean;
}

class Drawer extends Component<DrawerProps, DrawerState> {
  state = {};

  renderLinks(links: Array<Link>) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <Button type="primary" onClick={this.props.onClose}>
            <NavLink
              to={link.to}
              exact={link.exact}
              activeClassName={classes.active}
            >
              {link.label}
            </NavLink>
          </Button>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    const links: Array<Link> = [
      { to: '/', label: 'Quiz List', exact: true },
      { to: '/quiz/1', label: 'Main Quiz', exact: false },
    ];

    if (this.props.isAuthenticated) {
      links.push(
        { to: '/creator', label: 'Quiz Creator', exact: false },
        { to: '/logout', label: 'Logout', exact: false }
      );
    } else {
      links.push({ to: '/auth', label: 'Auth', exact: false });
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <h2>Menu</h2>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
