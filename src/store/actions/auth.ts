import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

export function auth(email: any, password: any, isLogin: boolean) {
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

    const expirationDate: any = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function autoLogout(time: any) {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function authSuccess(token: any) {
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
