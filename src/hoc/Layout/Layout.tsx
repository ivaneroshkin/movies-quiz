import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/UI/MenuToggle/MenuToggle';
import Drawer from '../../components/UI/Drawer/Drawer';

interface LayoutProps {}
interface LayoutState {
  menu: boolean;
}

class Layout extends Component<LayoutProps, LayoutState> {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
