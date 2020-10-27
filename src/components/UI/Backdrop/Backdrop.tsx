import React from 'react';
import classes from './Backdrop.module.css';

interface BackdropProps {
  onClick: any;
}

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.Backdrop} onClick={props.onClick} />;
};

export default Backdrop;
