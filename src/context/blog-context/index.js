/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import { blogGetListAction, blogGetListSuccessAction, blogGetListFailureAction } from './actions';
import blogReducer from './reducer';
import { getListBlogRequest } from '../../api/requests';

export const defaultValues = {
    list: [],
    isLoading: false,
    error: null,
    extraListInfo: {
        current_page: 1,
        last_page: 0,
        per_page: 0,
        total: 0,
    },
};

const BlogContext = createContext(defaultValues);

export const BlogProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(blogReducer, defaultValues);

    const fetchBlogList = (page) => {
        dispatchContext(blogGetListAction());
        getListBlogRequest(1)
            .then((response) => {
                console.log(response);
                const { data = [], last_page, current_page, per_page, total } = response;
                dispatchContext(
                    blogGetListSuccessAction({
                        data: data.length ? data : Object.values(data),
                        extraListInfo: {
                            last_page,
                            current_page,
                            per_page,
                            total,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(blogGetListFailureAction(err?.message));
            });
    };

    return (
        <BlogContext.Provider
            value={{
                ...state,
                onFetchMore: (page) => fetchBlogList(page),
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;
