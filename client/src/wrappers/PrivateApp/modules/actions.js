import { toastr } from 'react-redux-toastr';
import {
  APP_USER_REQUEST,
  APP_USER_SUCCESS,
} from './index';
import { LOGOUT_SUCCESS } from '../../../routes/Login/modules';

import { authorizedRequest } from '../../../utils/apiCaller';

export const loadProfile = () => {
  return async (dispatch) => {
    dispatch({ type: APP_USER_REQUEST });
    try {
      const response = await authorizedRequest('get', '/users/profile');
      dispatch({ type: APP_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch(logoutUser());
    }
  };
};

export const logoutUser = () => (
  (dispatch) => {
    localStorage.removeItem('chatting_app_token');
    localStorage.removeItem('chatting_app_user_email');
    dispatch({ type: LOGOUT_SUCCESS });
    toastr.success('User logout');
  }
);
