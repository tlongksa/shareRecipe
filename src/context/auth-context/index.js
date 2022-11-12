/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import { getAccountProfileRequest } from '../../api/requests';
import { USER_INFO_STORAGE_KEY } from '../../constants';
import {
    authSuccessAction,
    authLogoutAction,
    authGetProfileAction,
    authGetProfileSuccessAction,
    authGetProfileFailureAction,
    authUpdateProfileSuccessAction,
    updateProfileImageUrl,
} from './actions';
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
    profile: {
        isLoading: false,
        error: null,
        dataResponse: {},
    },
};

const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(authReducer, defaultValues);

    const fetchProfileDetail = (id) => {
        dispatchContext(authGetProfileAction());
        getAccountProfileRequest(id)
            .then(({ data }) => {
                dispatchContext(authGetProfileSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(authGetProfileFailureAction(err?.response?.data));
            });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                onLoginSuccess: (userInfo) => dispatchContext(authSuccessAction(userInfo)),
                onLogoutSuccess: () => dispatchContext(authLogoutAction()),
                onFetchProfile: (id) => fetchProfileDetail(id),
                onUpdateProfile: (updatedInfo) => dispatchContext(authUpdateProfileSuccessAction(updatedInfo)),
                onUpdateAvatarUrl: (url) => dispatchContext(updateProfileImageUrl(url)),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
