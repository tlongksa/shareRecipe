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
} from './actions';
import blogReducer from './reducer';
import { getBlogDetailRequest, getListBlogRequest, getBlogCommentsRequest } from '../../api/requests';

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
        comments: [],
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
                console.log(data);
                dispatchContext(blogGetCommentsSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(blogGetCommentsFailureAction(err?.message));
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
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;
