import axios from 'axios';

const getListBlogRequest = (page = 1, search = '') => axios.get(`/getListBlog?pageIndex=${page}&searchData=${search}`);

const getBlogDetailRequest = (id) => axios.get(`/getBlogDetail?blogId=${id}`);

const getBlogCommentsRequest = (id) => axios.get(`/getBlogComment?blogId=${id}`);

export { getListBlogRequest, getBlogDetailRequest, getBlogCommentsRequest };
