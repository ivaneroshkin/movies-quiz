import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

export function auth(email: string, password: string, isLogin: boolean) {
  return async (dispatch: any) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
    if (!apiKey) {
      alert('Firebase API key is missing. Please set REACT_APP_FIREBASE_API_KEY.');
      return;
    }

    let url: string =
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    if (isLogin) {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }

    try {
      const response = await axios.post(url, authData);

      const data = response.data;

      const expirationDate: Date = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('expirationDate', expirationDate.toDateString());

      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (error) {
      const axiosError = error as any;
      console.error('Authentication error:', axiosError.response?.data || axiosError.message);
      
      let errorMessage = 'Authentication failed. Please try again.';
      
      if (axiosError.response?.data?.error) {
        const errorCode = axiosError.response.data.error.message;
        switch (errorCode) {
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found. Please check your email or register.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Invalid password. Please try again.';
            break;
          case 'USER_DISABLED':
            errorMessage = 'This account has been disabled.';
            break;
          case 'EMAIL_EXISTS':
            errorMessage = 'This email is already registered. Please login instead.';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'Invalid email or password. Please check your credentials.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts. Please try again later.';
            break;
          case 'API_KEY_INVALID':
            errorMessage = 'Firebase API key is invalid. Please contact the administrator.';
            break;
          default:
            errorMessage = `Error: ${errorCode}`;
        }
      }
      
      alert(errorMessage);
      throw axiosError;
    }
  };
}

export function autoLogout(time: number) {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function autoLogin() {
  return (dispatch: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const dateFromLocalStorage: any = localStorage.getItem('expirationDate');
      const expirationDate: Date = new Date(dateFromLocalStorage);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function authSuccess(token: string) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
}
