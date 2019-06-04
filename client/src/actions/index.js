import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR
} from './types';

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
    
    cb();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email in use!'
    });
  }
};