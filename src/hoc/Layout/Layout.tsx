import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/UI/MenuToggle/MenuToggle';
import Drawer from '../../components/UI/Drawer/Drawer';
import { connect } from 'react-redux';
import { IRootState } from '../../App';

interface LayoutProps {
  isAuthenticated: boolean;
  children: React.ReactChild;
}
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
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
