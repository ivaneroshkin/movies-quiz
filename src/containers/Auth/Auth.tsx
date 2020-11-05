import React, { Component } from 'react';
import classes from './Auth.module.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

interface AuthProps {}
interface AuthState {
  formControls: Array<any>;
}

type eventType = {
  target: any;
};

function validateEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLocaleLowerCase());
}
class Auth extends Component<AuthProps, AuthState> {
  state = {
    formControls: [
      {
        value: '',
        type: 'email',
        label: 'Login',
        errorMessage: 'Invalid login',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Invalid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    ],
  };

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = (event: any) => {
    console.log('event', event);
    event.preventDefault();
  };

  validateControl = (value: string, validation: any): boolean => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLenght) {
      isValid = value.length >= validation.minLenght && isValid;
    }

    return isValid;
  };

  onChangeHandler = (event: eventType, index: number) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[index] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[index] = control;
    this.setState({
      formControls,
    });
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[index];
      return (
        <Input
          key={control.label + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event: eventType) => this.onChangeHandler(event, index)}
        />
      );
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthWrapper}>
          <h2>Auth</h2>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler}>
              Login
            </Button>

            <Button type="primary" onClick={this.registerHandler}>
              Registration
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
