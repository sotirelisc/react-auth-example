import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR
} from './types';

export const signIn = ({ email, password }, cb) => async dispatch => {
  try {
    const response = axios.post('http://localhost:3090/signin', {
      email,
      password
    });

    dispatch({
      type: AUTH_USER,
      payload: response.token
    });

    localStorage.setItem('token', response.token);
    
    cb();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login credentials!'
    });
  }
};

export const signUp = ({ email, password }, cb) => async dispatch => {
  try {
    const response = axios.post('http://localhost:3090/signup', {
      email,
      password
    });

    dispatch({
      type: AUTH_USER,
      payload: response.token
    });

    localStorage.setItem('token', response.token);
    
    cb();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email in use!'
    });
  }
};

export const signOut = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};