import { BLOG_GET_LIST, BLOG_GET_LIST_SUCCESS, BLOG_GET_LIST_FAILURE } from './types';

const blogGetListAction = () => ({
    type: BLOG_GET_LIST,
});

const blogGetListSuccessAction = (payload) => ({
    type: BLOG_GET_LIST_SUCCESS,
    payload,
});

const blogGetListFailureAction = (error) => ({
    type: BLOG_GET_LIST_FAILURE,
    payload: error,
});

export { blogGetListAction, blogGetListSuccessAction, blogGetListFailureAction };
