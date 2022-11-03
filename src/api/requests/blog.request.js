import axios from 'axios';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

const getListBlogRequest = (page = 1, search = '') => axios.get(`/getListBlog?pageIndex=${page}&searchData=${search}`);

const getBlogDetailRequest = (id) => axios.get(`/getBlogDetail?blogId=${id}`);

const getBlogCommentsRequest = (id, page = 1) => axios.get(`/getBlogComment?blogId=${id}&pageIndex=${page}`);

const getListPendingBlogRequest = (page = 1, search = '') =>
    axios.get(`/admin/listBlogPending?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const approvePendingBlogRequest = (id) =>
    axios.post(`/admin/approveBlog?blogId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteBlogRequest = (id) =>
    axios.post(`/deleteBlog?blogId=${id}`, null, {
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

const likeBlogCommentRequest = (id) =>
    axios.post(`/likeBlogComment?blogCommentId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const dislikeBlogCommentRequest = (id) =>
    axios.post(`/dislikeBlogComment?blogCommentId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteBlogCommentRequest = (id) =>
    axios.post(`/deleteBlogComment?blogCommentId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getListBlogCommentReportRequest = (page = 1, search = '') =>
    axios.get(`/admin/getListBlogCommentReport?pageIndex=${page}&searchData=${search}`, {
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
    likeBlogCommentRequest,
    dislikeBlogCommentRequest,
    deleteBlogCommentRequest,
    getListBlogCommentReportRequest,
};
