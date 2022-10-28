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
    BLOG_GET_LIST_PENDING,
    BLOG_GET_LIST_PENDING_FAILURE,
    BLOG_GET_LIST_PENDING_SUCCESS,
    BLOG_DETAIL_CLEAR,
    BLOG_LIKE_ITEM_SUCCESS,
    BLOG_DISLIKE_ITEM_SUCCESS,
    BLOG_LIKE_ITEM_DETAIL_SUCCESS,
    BLOG_DISLIKE_ITEM_DETAIL_SUCCESS,
    BLOG_CLEAR_LIST_PENDING,
    BLOG_REMOVE_ITEM_FROM_LIST_PENDING,
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

const blogGetListPendingAction = () => ({
    type: BLOG_GET_LIST_PENDING,
});

const blogGetListPendingSuccessAction = (payload) => ({
    type: BLOG_GET_LIST_PENDING_SUCCESS,
    payload,
});

const blogGetListPendingFailureAction = (error) => ({
    type: BLOG_GET_LIST_PENDING_FAILURE,
    payload: error,
});

const clearBlogDetailAction = () => ({
    type: BLOG_DETAIL_CLEAR,
});

const blogLikeItemSuccessAction = (payload) => ({
    type: BLOG_LIKE_ITEM_SUCCESS,
    payload,
});

const blogDislikeItemSuccessAction = (payload) => ({
    type: BLOG_DISLIKE_ITEM_SUCCESS,
    payload,
});

const blogLikeItemDetailSuccessAction = () => ({
    type: BLOG_LIKE_ITEM_DETAIL_SUCCESS,
});

const blogDislikeItemDetailSuccessAction = () => ({
    type: BLOG_DISLIKE_ITEM_DETAIL_SUCCESS,
});

const clearPendingBlogList = () => ({
    type: BLOG_CLEAR_LIST_PENDING,
});

const removeItemFromPendingBlogList = (payload) => ({
    type: BLOG_REMOVE_ITEM_FROM_LIST_PENDING,
    payload,
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
    blogGetListPendingAction,
    blogGetListPendingFailureAction,
    blogGetListPendingSuccessAction,
    clearBlogDetailAction,
    blogLikeItemSuccessAction,
    blogDislikeItemSuccessAction,
    blogLikeItemDetailSuccessAction,
    blogDislikeItemDetailSuccessAction,
    clearPendingBlogList,
    removeItemFromPendingBlogList,
};
