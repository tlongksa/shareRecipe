import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_GET_PROFILE,
    AUTH_GET_PROFILE_SUCCESS,
    AUTH_GET_PROFILE_FAILURE,
    AUTH_UPDATE_PROFILE_SUCCESS,
    AUTH_UPDATE_PROFILE_IMAGE_URL,
} from './types';

const authSuccessAction = (payload) => ({
    type: AUTH_SUCCESS,
    payload,
});

const authLogoutAction = () => ({
    type: AUTH_LOGOUT,
});

const authGetProfileAction = () => ({
    type: AUTH_GET_PROFILE,
});

const authGetProfileSuccessAction = (payload) => ({
    type: AUTH_GET_PROFILE_SUCCESS,
    payload,
});

const authGetProfileFailureAction = (error) => ({
    type: AUTH_GET_PROFILE_FAILURE,
    payload: error,
});

const authUpdateProfileSuccessAction = (payload) => ({
    type: AUTH_UPDATE_PROFILE_SUCCESS,
    payload,
});

const updateProfileImageUrl = (payload) => ({
    type: AUTH_UPDATE_PROFILE_IMAGE_URL,
    payload,
});

export {
    authSuccessAction,
    authLogoutAction,
    authGetProfileAction,
    authGetProfileSuccessAction,
    authGetProfileFailureAction,
    authUpdateProfileSuccessAction,
    updateProfileImageUrl,
};
