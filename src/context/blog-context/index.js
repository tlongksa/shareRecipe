/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import {
    blogGetListAction,
    blogGetListSuccessAction,
    blogGetListFailureAction,
    blogClearListAction,
    blogGetDetailAction,
    blogGetDetailFailureAction,
    blogGetDetailSuccessAction,
    blogGetCommentsAction,
    blogGetCommentsFailureAction,
    blogGetCommentsSuccessAction,
    blogGetListPendingAction,
    blogGetListPendingSuccessAction,
    blogGetListPendingFailureAction,
    clearBlogDetailAction,
    blogLikeItemSuccessAction,
    blogDislikeItemSuccessAction,
    blogLikeItemDetailSuccessAction,
    blogDislikeItemDetailSuccessAction,
} from './actions';
import blogReducer from './reducer';
import {
    getBlogDetailRequest,
    getListBlogRequest,
    getBlogCommentsRequest,
    getListPendingBlogRequest,
} from '../../api/requests';

export const defaultValues = {
    list: [],
    isLoading: false,
    error: null,
    extraListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
    blogDetail: {
        dataResponse: {},
        isLoading: false,
        error: null,
        comments: {
            dataResponse: [],
            extraListInfo: {
                pageIndex: 1,
                numOfPages: 0,
            },
        },
    },
    listPendingBlog: [],
    extraPendingBlogListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
};

const BlogContext = createContext(defaultValues);

export const BlogProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(blogReducer, defaultValues);

    const fetchBlogList = (page, search = '') => {
        dispatchContext(blogGetListAction());
        getListBlogRequest(page, search)
            .then(({ data }) => {
                const { listBlogActive = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    blogGetListSuccessAction({
                        data: listBlogActive,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(blogGetListFailureAction(err?.message));
            });
    };

    const fetchBlogDetail = (id) => {
        dispatchContext(blogGetDetailAction());
        getBlogDetailRequest(id)
            .then(({ data }) => {
                dispatchContext(blogGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(blogGetDetailFailureAction(err?.message));
            });
    };

    const fetchBlogComments = (id) => {
        dispatchContext(blogGetCommentsAction());
        getBlogCommentsRequest(id)
            .then(({ data }) => {
                dispatchContext(
                    blogGetCommentsSuccessAction({
                        data: data.blogCommentAccountVos,
                        extraListInfo: {
                            pageIndex: data.pageIndex,
                            numOfPages: data.numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(blogGetCommentsFailureAction(err?.message));
            });
    };

    const fetchPendingBlogList = (page, search = '') => {
        dispatchContext(blogGetListPendingAction());
        getListPendingBlogRequest(page, search)
            .then(({ data }) => {
                const { listBlogPending = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    blogGetListPendingSuccessAction({
                        data: listBlogPending,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(blogGetListPendingFailureAction(err?.message));
            });
    };

    return (
        <BlogContext.Provider
            value={{
                ...state,
                onFetchMore: (page, search) => fetchBlogList(page, search),
                onClearList: () => dispatchContext(blogClearListAction()),
                onFetchDetail: (id) => fetchBlogDetail(id),
                onFetchComments: (id) => fetchBlogComments(id),
                onFetchMorePendingList: (page, search) => fetchPendingBlogList(page, search),
                onClearDetail: (id) => dispatchContext(clearBlogDetailAction()),
                onLikeItem: (id) => dispatchContext(blogLikeItemSuccessAction(id)),
                onDislikeItem: (id) => dispatchContext(blogDislikeItemSuccessAction(id)),
                onLikeItemDetail: () => dispatchContext(blogLikeItemDetailSuccessAction()),
                onDislikeItemDetail: () => dispatchContext(blogDislikeItemDetailSuccessAction()),
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;
