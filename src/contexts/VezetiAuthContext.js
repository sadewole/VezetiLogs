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
  localStorage.setItem('base64Token', base64Token);
  axios.defaults.headers.common.Authorization = `Basic ${base64Token}`;
} else {
  localStorage.removeItem('base64Token');
  delete axios.defaults.headers.common.Authorization;
}

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const setUserStorage = data => {
  if (data) {
    const user = JSON.stringify({
      userId: data.userId,
      orgId: data.orgId
    });
    localStorage.setItem('user', user);
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
      const { responseData } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
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
      const { responseData } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user: responseData
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
  register: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async data => {
    try {
      const body = JSON.stringify(data);
      const response = await axios.post(`${url}login/`, body, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { responseData } = response.data;
      console.log(responseData);
      setUserStorage(responseData);
      // dispatch({
      //   type: 'LOGIN',
      //   payload: { responseData }
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const register = async data => {
    try {
      const body = JSON.stringify(data);
      const response = await axios.post(`${url}signup/`, body, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { responseData } = response.data;
      setUserStorage(responseData);

      dispatch({
        type: 'REGISTER',
        payload: { responseData }
      });
    } catch (err) {
      console.log(err);
    }
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
          console.log(responseData);
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
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
