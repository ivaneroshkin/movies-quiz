import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

export function auth(email: string, password: string, isLogin: boolean) {
  return async (dispatch: any) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url: string =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCG37Ok9Hk-rZEJ8nMo3kO-eKhtaDzJQn8';

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCG37Ok9Hk-rZEJ8nMo3kO-eKhtaDzJQn8';
    }

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
