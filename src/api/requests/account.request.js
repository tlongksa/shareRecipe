import axios from 'axios';
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

const deleteAccountRequest = (id) =>
    axios.delete(`/admin/deleteAccount/${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

export { getListAccountRequest, getAccountDetailRequest, deleteAccountRequest };
