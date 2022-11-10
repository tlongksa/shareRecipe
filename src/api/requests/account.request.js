import axios from './axiosInstance';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

const getListAccountRequest = (page = 1, search = '') =>
    axios.get(`/admin/listAccount?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getAccountDetailRequest = (id) =>
    axios.get(`/admin/getProfile/${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const updateAccountRoleRequest = (id, role) =>
    axios.post(`/admin/changeRole?accountId=${id}&role=${role}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteAccountRequest = (id) =>
    axios.post(`/admin/deleteAccount?accountId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getAccountProfileRequest = (id) =>
    axios.get(`/getprofile?profile_id=${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const updateAccountProfileRequest = (id, data) =>
    axios.put(`/updateprofile?profile_id=${id}`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const updateProfileImageRequest = (id, url) =>
    axios.put(`/updateimage?profile_id=${id}`, url, {
        headers: {
            authorization: `Bearer ${token || ''}`,
            'Content-Type': 'text/plain',
        },
    });

export {
    getListAccountRequest,
    getAccountDetailRequest,
    deleteAccountRequest,
    updateAccountRoleRequest,
    getAccountProfileRequest,
    updateAccountProfileRequest,
    updateProfileImageRequest,
};
