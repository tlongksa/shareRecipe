/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import { USER_INFO_STORAGE_KEY } from '../../constants';
import { authSuccessAction, authLogoutAction } from './actions';
import authReducer from './reducer';

export const defaultValues = {
    userInfo: localStorage.getItem(USER_INFO_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(USER_INFO_STORAGE_KEY))
        : {
              avatarImage: '',
              roles: '',
              username: '',
              accessToken: '',
              id: 0,
          },
    isLoading: false,
    error: null,
};

const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(authReducer, defaultValues);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                onLoginSuccess: (userInfo) => dispatchContext(authSuccessAction(userInfo)),
                onLogoutSuccess: () => dispatchContext(authLogoutAction()),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
