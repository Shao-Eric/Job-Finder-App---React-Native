import { combineReducers } from 'redux';
import auth from './auth_reducer';

export default combineReducers(
  {
    auth //auth = auth: {auth}
  } //reducer must return an object, string or number
);
