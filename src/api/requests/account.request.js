import axios from 'axios';

const token = localStorage.getItem('token');

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
