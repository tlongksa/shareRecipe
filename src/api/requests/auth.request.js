import axios from './axiosInstance';
import { getAccessToken } from '../../utils';
import apiUrl from '../apiUrl';
const token = getAccessToken();

const resetNewPasswordRequest = (formData) =>
    axios.post(`/resetPassword?token=${formData.token}&password=${formData.password}`);

const changePasswordRequest = (formData) =>
    axios.post(apiUrl.ChangePassword_URL, formData, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });
const forgotPasswordRequest = (email) => axios.post(`/forgot_password?email=${email}`);

const loginRequest = (formData) =>
    axios.post(apiUrl.LOGIN_URL, formData, {
        headers: { 'Content-Type': 'application/json' },
    });

const signupRequest = (formData) =>
    axios.post(apiUrl.REGISTER_URL, JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
    });

export { resetNewPasswordRequest, changePasswordRequest, forgotPasswordRequest, loginRequest, signupRequest };
