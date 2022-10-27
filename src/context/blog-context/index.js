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
} from './actions';
import blogReducer from './reducer';
import { getBlogDetailRequest, getListBlogRequest } from '../../api/requests';

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
    },
};

const BlogContext = createContext(defaultValues);

export const BlogProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(blogReducer, defaultValues);

    const fetchBlogList = (page) => {
        dispatchContext(blogGetListAction());
        getListBlogRequest(1)
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

    return (
        <BlogContext.Provider
            value={{
                ...state,
                onFetchMore: (page) => fetchBlogList(page),
                onClearList: () => dispatchContext(blogClearListAction()),
                onFetchDetail: (id) => fetchBlogDetail(id),
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;
