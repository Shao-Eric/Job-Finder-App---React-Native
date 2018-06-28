import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_PROGRESS
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      const { token, expires } = action.payload;
      return { ...state, token, expires };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null, expires: null };
    case FACEBOOK_LOGIN_PROGRESS:
      const { progress } = action.payload;
      return { ...state, progress };
    default:
      return state;
  }
};
