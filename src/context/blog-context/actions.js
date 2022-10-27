import {
    BLOG_GET_LIST,
    BLOG_GET_LIST_SUCCESS,
    BLOG_GET_LIST_FAILURE,
    BLOG_CLEAR_LIST,
    BLOG_GET_DETAIL,
    BLOG_GET_DETAIL_FAILURE,
    BLOG_GET_DETAIL_SUCCESS,
    BLOG_GET_COMMENTS,
    BLOG_GET_COMMENTS_SUCCESS,
    BLOG_GET_COMMENTS_FAILURE,
} from './types';

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

const blogClearListAction = () => ({
    type: BLOG_CLEAR_LIST,
});

const blogGetDetailAction = () => ({
    type: BLOG_GET_DETAIL,
});

const blogGetDetailSuccessAction = (payload) => ({
    type: BLOG_GET_DETAIL_SUCCESS,
    payload,
});

const blogGetDetailFailureAction = (error) => ({
    type: BLOG_GET_DETAIL_FAILURE,
    payload: error,
});

const blogGetCommentsAction = () => ({
    type: BLOG_GET_COMMENTS,
});

const blogGetCommentsSuccessAction = (payload) => ({
    type: BLOG_GET_COMMENTS_SUCCESS,
    payload,
});

const blogGetCommentsFailureAction = (error) => ({
    type: BLOG_GET_COMMENTS_FAILURE,
    payload: error,
});

export {
    blogGetListAction,
    blogGetListSuccessAction,
    blogGetListFailureAction,
    blogClearListAction,
    blogGetDetailAction,
    blogGetDetailSuccessAction,
    blogGetDetailFailureAction,
    blogGetCommentsAction,
    blogGetCommentsFailureAction,
    blogGetCommentsSuccessAction,
};
