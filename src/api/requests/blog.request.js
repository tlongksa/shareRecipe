import axios from 'axios';
const token = localStorage.getItem('token');

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

export {
    getListBlogRequest,
    getBlogDetailRequest,
    getBlogCommentsRequest,
    getListPendingBlogRequest,
    approvePendingBlogRequest,
    deleteBlogRequest,
};
