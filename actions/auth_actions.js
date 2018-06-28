import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

//AsyncStorage.setItem('fb_token', token) storage on physical device
//AsyncStorage.getItem('fb_token');

//console.log(AsyncStorage.getItem('fb_token')) we cannot do this
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    //dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    //Start the FB login process
    doFacebookLogin(dispatch);
  }
};
//type tells whether if its successful
const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '179445649398907',
    {
      permissions: ['public_profile']
    }
  );
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  await AsyncStorage.setItem('fb_token', token);
  //wait for the token to be saved, await is optional
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
