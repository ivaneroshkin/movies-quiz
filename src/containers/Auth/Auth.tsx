import React, { Component } from 'react';
import axios from 'axios';
import classes from './Auth.module.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

interface AuthProps {}
interface AuthState {
  isFormValid: boolean;
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
    isFormValid: false,
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

  // TODO: Update loginHandler and registerHandler, display successful or error human-friendly alert and route user to another page

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls[0].value,
      password: this.state.formControls[1].value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCG37Ok9Hk-rZEJ8nMo3kO-eKhtaDzJQn8',
        authData
      );
      console.log('login response:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls[0].value,
      password: this.state.formControls[1].value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCG37Ok9Hk-rZEJ8nMo3kO-eKhtaDzJQn8',
        authData
      );
      console.log('register response:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = (event: any) => {
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

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
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
    let isFormValid = true;

    Object.keys(formControls).forEach((element: any) => {
      isFormValid = formControls[element].valid && isFormValid;
    });

    this.setState({
      isFormValid,
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

            <Button
              type="success"
              onClick={this.loginHandler}
              isDisabled={!this.state.isFormValid}
            >
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
