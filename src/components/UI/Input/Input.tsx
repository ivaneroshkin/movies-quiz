import React from 'react';
import classes from './Input.module.css';

interface InputProps {
  shouldValidate?: boolean;
  touched?: any;
  valid?: any;
  label: string;
  type?: string;
  errorMessage?: string;
  value?: any;
  onChange?: any;
}

function isInvalid({ valid, touched, shouldValidate }: any) {
  return !valid && shouldValidate && touched;
}

const Input = (props: InputProps) => {
  const inputType = props.type || 'type';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />

      {isInvalid(props) ? <span>{props.errorMessage || 'error'}</span> : null}
    </div>
  );
};

export default Input;
