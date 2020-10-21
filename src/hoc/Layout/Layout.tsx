import React, { Component } from 'react'
import classes from './Layout.module.css'

interface LayoutProps {
  
}
interface LayoutState {
  
}

class Layout extends Component<LayoutProps, LayoutState> {
  state = {}

  render() {
    return (
      <div className={classes.Layout}>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout