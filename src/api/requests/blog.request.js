import axios from 'axios';

const getListBlogRequest = (page) => axios.get(`/getListBlog?page=${page}`);

export { getListBlogRequest };
