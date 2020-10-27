import React, { Component } from 'react';
import classes from './Drawer.module.css';

import Button from '../Button/Button';
import Backdrop from '../Backdrop/Backdrop';

interface DrawerProps {
  isOpen: boolean;
  onClose: any;
}
interface State {}

const links = [1, 2, 3];

class Drawer extends Component<DrawerProps, State> {
  state = {};

  linkToQuiz() {
    console.log('Link to Quiz');
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <Button type="primary" onClick={this.linkToQuiz}>
            Quiz - {link}
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

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
