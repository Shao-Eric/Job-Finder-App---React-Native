import { AsyncStorage } from 'react-native';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_PROGRESS
} from './types';
import { Facebook } from 'expo';

export const checkAuth = () => async dispatch => {
  dispatch({ type: FACEBOOK_LOGIN_PROGRESS, payload: { progress: 'running' } });
  try {
    const token = await AsyncStorage.getItem('fb_token');
    const expires = await AsyncStorage.getItem('fb_expires');
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const isTokenValid = token && expires && expires > currentTime;

    if (isTokenValid) {
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, expires } });
    } else {
      dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
  } catch (error) {
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  dispatch({
    type: FACEBOOK_LOGIN_PROGRESS,
    payload: { progress: 'completed' }
  });
};

export const facebookLogin = () => async dispatch => {
  dispatch({ type: FACEBOOK_LOGIN_PROGRESS, payload: { progress: 'running' } });
  const token = await AsyncStorage.getItem('fb_token');
  const expires = await AsyncStorage.getItem('fb_expires');
  const currentTime = Math.floor(new Date().getTime() / 1000);

  if (token && expires && expires > currentTime) {
    dispatch({
      type: FACEBOOK_LOGIN_PROGRESS,
      payload: { progress: 'completed' }
    });
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, expires } });
  } else {
    try {
      const { token, expires } = await doFacebookLogin();
      await AsyncStorage.setItem('fb_token', token);
      await AsyncStorage.setItem('fb_expires', String(expires));
      dispatch({
        type: FACEBOOK_LOGIN_PROGRESS,
        payload: { progress: 'completed' }
      });
      return dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: { token, expires }
      });
    } catch (error) {
      dispatch({
        type: FACEBOOK_LOGIN_PROGRESS,
        payload: { progress: 'completed' }
      });
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
  }
};

const doFacebookLogin = async () => {
  const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
    '2156514014376187',
    { permissions: ['public_profile'] }
  );

  if (type === 'cancel') {
    throw new Error({ error: 'Facebook login cancelled' });
  }

  if (type === 'success') {
    return { token, expires };
  }
};

//Other permissions
//  "user_friends"
//   "user_likes"
//   "user_education_history"
//   "user_work_history"
