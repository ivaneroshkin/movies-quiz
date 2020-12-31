import React, { ReactNode } from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  type: string;
  onClick?: any;
  children: string | ReactNode;
  isDisabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const cls = [classes.Button, classes[props.type]];

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
