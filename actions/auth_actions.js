import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';
// AsyncStorage.setItem('fb_token', token); (key, value)
// AsyncStorage.getItem('fb_token');
// Async returns a promise

//this function with dispatch arg allow us to dispatch the action at any point of time
//then add async in front of function to tell babel this is an async code
// take out function keyword and use the arrow func syntax instead
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    //dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    //need to pass in the dispatch function so the doFacebookLogin can do dispatch
    doFacebookLogin(dispatch);
  }
};
//second arg is to define the permission that we need access to:
const doFacebookLogin = async dispatch => {
  //result will have a type property and token property
  //type=status of the login process , so we change result to {type, token}
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '432272117234765',
    { permissions: ['public_profile'] }
  );
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  await AsyncStorage.setItem('fb_token', token); //wait for this to complete. optional await
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
