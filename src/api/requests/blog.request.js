import axios from 'axios';

const getListBlogRequest = (page) => axios.get(`/getListBlog?page=${page}`);

const getBlogDetailRequest = (id) => axios.get(`/getBlogDetail?blogId=${id}`);

export { getListBlogRequest, getBlogDetailRequest };
