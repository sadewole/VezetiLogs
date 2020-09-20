import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { vezetiConfig } from 'src/config';

const url = 'https://secure.vezeti.net/test-api/v3/';
const base64Token = btoa(
  `${vezetiConfig.usernameAuth}:${vezetiConfig.passwordAuth}`
);
if (base64Token) {
  localStorage.setItem('base64Token', base64Token);
  axios.defaults.headers.common.Authorization = `Basic ${base64Token}`;
} else {
  localStorage.removeItem('base64Token');
  delete axios.defaults.headers.common.Authorization;
}

const initialState = {
  message: ''
};

const slice = createSlice({
  name: 'forgotAuth',
  initialState,
  reducers: {
    postForgotPassword(state, action) {
      const { responseMessage } = action.payload;

      state.message = responseMessage;
    },
    postForgotPin(state, action) {
      const { responseMessage } = action.payload;

      state.message = responseMessage;
    },
    changeEmail(state, action) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = '';
    }
  }
});

export const reducer = slice.reducer;

export const postForgotPassword = (orgId, email) => async dispatch => {
  try {
    const body = JSON.stringify({
      orgId,
      email
    });
    const response = await axios.post(`${url}forgotpassword/`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch(slice.actions.postForgotPassword(response.data));
    setTimeout(() => dispatch(slice.actions.clearMessage()), 3000);
  } catch (err) {
    console.log(err);
  }
};

export const clearMessage = () => dispatch => {
  dispatch(slice.actions.clearMessage());
};

export const postForgotPin = (orgId, mobile) => async dispatch => {
  try {
    const body = JSON.stringify({ orgId, mobile });
    const response = await axios.post(`${url}forgotpin/`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch(slice.actions.postForgotPin(response.data));
    setTimeout(() => dispatch(slice.actions.clearMessage()), 3000);
  } catch (err) {
    console.log(err);
  }
};

export const changeEmail = (currentEmail, newEmail) => async dispatch => {
  try {
    const user = window.localStorage.getItem('user');
    const { userId, orgId } = JSON.parse(user);
    const body = JSON.stringify({ currentEmail, newEmail, userId, orgId });
    await axios.post(`${url}change-user-email/`, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch(slice.actions.changeEmail('Email changed successfully'));
    setTimeout(() => dispatch(slice.actions.clearMessage()), 3000);
  } catch (err) {
    console.log(err);
  }
};

export default slice;
