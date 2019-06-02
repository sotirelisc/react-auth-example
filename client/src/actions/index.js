import axios from 'axios';
import {
  AUTH_USER
} from './types';

export const signUp = ({ email, password }) => dispatch => {
  axios.post('http://localhost:3090/signup', {
    email,
    password
  });
};