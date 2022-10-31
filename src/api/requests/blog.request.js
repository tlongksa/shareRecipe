import axios from 'axios';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

const getListBlogRequest = (page = 1, search = '') => axios.get(`/getListBlog?pageIndex=${page}&searchData=${search}`);

const getBlogDetailRequest = (id) => axios.get(`/getBlogDetail?blogId=${id}`);

const getBlogCommentsRequest = (id) => axios.get(`/getBlogComment?blogId=${id}`);

const getListPendingBlogRequest = (page = 1, search = '') =>
    axios.get(`/admin/listBlogPending?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const approvePendingBlogRequest = (id) =>
    axios.post(`/admin/approveBlog?blogId=${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteBlogRequest = (id) =>
    axios.delete(`/admin/deleteBlog?blogId=${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const likeBlogRequest = (id) =>
    axios.post(`/likeBlog?blogId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const dislikeBlogRequest = (id) =>
    axios.post(`/dislikeBlog?blogId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const commentOnBlogRequest = (data) =>
    axios.post(`/saveBlogComment`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const createBlogRequest = (data) =>
    axios.post(`/saveBlog`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

export {
    getListBlogRequest,
    getBlogDetailRequest,
    getBlogCommentsRequest,
    getListPendingBlogRequest,
    approvePendingBlogRequest,
    deleteBlogRequest,
    likeBlogRequest,
    dislikeBlogRequest,
    commentOnBlogRequest,
    createBlogRequest,
};
