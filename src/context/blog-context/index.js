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
    clearPendingBlogList,
    removeItemFromPendingBlogList,
    blogGetCommentReportListAction,
    blogGetCommentReportListSuccessAction,
    blogGetCommentReportListFailureAction,
    blogUpdateCommentContentAction,
    removeBlogCommentReportAction,
    increaseNumOfComments,
} from './actions';
import blogReducer from './reducer';
import {
    getBlogDetailRequest,
    getListBlogRequest,
    getBlogCommentsRequest,
    getListPendingBlogRequest,
    getListBlogCommentReportRequest,
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
    blogCommentReport: {
        list: [],
        isLoading: false,
        error: null,
        extraListInfo: {
            pageIndex: 1,
            numOfPages: 0,
        },
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
                dispatchContext(blogGetListFailureAction(err?.response?.data));
            });
    };

    const fetchBlogDetail = (id) => {
        dispatchContext(blogGetDetailAction());
        getBlogDetailRequest(id)
            .then(({ data }) => {
                dispatchContext(blogGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(blogGetDetailFailureAction(err?.response?.data));
            });
    };

    const fetchBlogComments = (id, page = 1) => {
        dispatchContext(blogGetCommentsAction());
        getBlogCommentsRequest(id, page)
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
                dispatchContext(blogGetCommentsFailureAction(err?.response?.data));
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
                dispatchContext(blogGetListPendingFailureAction(err?.response?.data));
            });
    };

    const fetchBlogCommentReportList = (page, search = '') => {
        dispatchContext(blogGetCommentReportListAction());
        getListBlogCommentReportRequest(page, search)
            .then(({ data }) => {
                const { dishCommentAccountVoList = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    blogGetCommentReportListSuccessAction({
                        data: dishCommentAccountVoList,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(blogGetCommentReportListFailureAction(err?.response?.data));
            });
    };

    return (
        <BlogContext.Provider
            value={{
                ...state,
                onFetchMore: (page, search) => fetchBlogList(page, search),
                onClearList: () => dispatchContext(blogClearListAction()),
                onFetchDetail: (id) => fetchBlogDetail(id),
                onFetchComments: (id, page) => fetchBlogComments(id, page),
                onFetchMorePendingList: (page, search) => fetchPendingBlogList(page, search),
                onClearDetail: (id) => dispatchContext(clearBlogDetailAction()),
                onLikeItem: (id) => dispatchContext(blogLikeItemSuccessAction(id)),
                onDislikeItem: (id) => dispatchContext(blogDislikeItemSuccessAction(id)),
                onLikeItemDetail: () => dispatchContext(blogLikeItemDetailSuccessAction()),
                onDislikeItemDetail: () => dispatchContext(blogDislikeItemDetailSuccessAction()),
                onClearPendingList: () => dispatchContext(clearPendingBlogList()),
                onRemoveFromPendingList: (id) => dispatchContext(removeItemFromPendingBlogList(id)),
                onFetchMoreBlogCommentReport: (page, search) => fetchBlogCommentReportList(page, search),
                onUpdateComment: (data) => dispatchContext(blogUpdateCommentContentAction(data)),
                onRemoveBlogCommentReport: (id) => dispatchContext(removeBlogCommentReportAction(id)),
                onIncreaseNumOfComments: () => dispatchContext(increaseNumOfComments()),
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;
