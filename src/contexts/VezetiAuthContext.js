import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import SplashScreen from 'src/components/SplashScreen';
import axios from 'axios';
import { vezetiConfig } from 'src/config';

const url = 'https://secure.vezeti.net/test-api/v3/';
const base64Token = btoa(
  `${vezetiConfig.usernameAuth}:${vezetiConfig.passwordAuth}`
);
if (base64Token) {
  axios.defaults.headers.common.Authorization = `Basic ${base64Token}`;
}

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  message: ''
};

const setUserStorage = data => {
  if (data) {
    const user = JSON.stringify({
      userId: data.userGlobalId,
      orgId: data.orgId
    });
    localStorage.setItem('user', user);
  } else {
    sessionStorage.removeItem('lastTimeStamp');
    localStorage.removeItem('user');
  }
};

const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, responseData } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user: responseData
      };
    }
    case 'LOGIN': {
      const { responseData, message } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        message,
        user: responseData
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    case 'REGISTER': {
      const { responseData, message } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user: responseData,
        message
      };
    }
    case 'MESSAGE': {
      const { responseMessage } = action.payload;

      return {
        ...state,
        isAuthenticated: false,
        message: responseMessage
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        message: ''
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  clearMessage: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async data => {
    try {
      const body = JSON.stringify(data);
      const response = await axios.post(`${url}login/`, body, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { responseData, responseMessage } = response.data;
      if (!responseData) {
        dispatch({
          type: 'MESSAGE',
          payload: { responseMessage }
        });
        setTimeout(clearMessage, 5000);
        return;
      }
      setUserStorage(responseData);
      dispatch({
        type: 'LOGIN',
        payload: {
          responseData,
          message: `User login successful via ${
            data.email ? 'email' : 'mobile number'
          }`
        }
      });
      setTimeout(clearMessage, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUserStorage(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async data => {
    try {
      const body = JSON.stringify(data);
      const response = await axios.post(`${url}signup/`, body, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { responseData, responseMessage } = response.data;

      if (!responseData) {
        dispatch({
          type: 'MESSAGE',
          payload: { responseMessage }
        });
        setTimeout(clearMessage, 5000);
        return;
      }
      setUserStorage(responseData);

      dispatch({
        type: 'REGISTER',
        payload: {
          responseData,
          message: 'User registered successfully '
        }
      });
      setTimeout(clearMessage, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  const clearMessage = () => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const user = window.localStorage.getItem('user');

        if (user) {
          const { userId, orgId } = JSON.parse(user);
          const body = JSON.stringify({ userId, orgId });
          const response = await axios.post(
            `${url}get-user-account-parameters/`,
            body,
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );
          const { responseData } = response.data;
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              responseData
            }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              responseData: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            responseData: null
          }
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        clearMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
