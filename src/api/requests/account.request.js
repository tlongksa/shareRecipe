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
    axios.get(`/getprofile/${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

export {
    getListAccountRequest,
    getAccountDetailRequest,
    deleteAccountRequest,
    updateAccountRoleRequest,
    getAccountProfileRequest,
};
