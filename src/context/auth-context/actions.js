import { AUTH_SUCCESS, AUTH_LOGOUT } from './types';

const authSuccessAction = (payload) => ({
    type: AUTH_SUCCESS,
    payload,
});

const authLogoutAction = () => ({
    type: AUTH_LOGOUT,
});

export { authSuccessAction, authLogoutAction };
