/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import {
    recipeGetListAction,
    recipeGetListSuccessAction,
    recipeGetListFailureAction,
    recipeClearListAction,
    recipeGetDetailAction,
    recipeGetDetailFailureAction,
    recipeGetDetailSuccessAction,
    recipeAdminGetListAction,
    recipeAdminGetListSuccessAction,
    recipeAdminGetListFailureAction,
    recipeGetListByNameAction,
    recipeGetListByNameSuccessAction,
    recipeGetListByNameFailureAction,
    recipeGetListCategoryAction,
    recipeGetListCategorySuccessAction,
    recipeGetListCategoryFailureAction,
    recipeClearDetailAction,
    recipeGetCommentReportListAction,
    recipeGetCommentReportListSuccessAction,
    recipeGetCommentReportListFailureAction,
} from './actions';
import recipeReducer from './reducer';
import {
    getRecipeDetailRequest,
    getListRecipeByCategoryRequest,
    adminGetRecipeListRequest,
    getListRecipeByNameRequest,
    getListRecipeCategoriesRequest,
    getListReportRecipeCommentRequest,
} from '../../api/requests';

export const defaultValues = {
    list: [],
    isLoading: false,
    error: null,
    extraListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
    recipeDetail: {
        dataResponse: {},
        isLoading: false,
        error: null,
    },
    adminRecipeList: [],
    adminRecipeExtraListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
    recipeByNameList: [],
    recipeByNameExtraListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
    categories: {
        isLoading: false,
        error: null,
        list: [],
    },
    recipeCommentReport: {
        list: [],
        isLoading: false,
        error: null,
        extraListInfo: {
            pageIndex: 1,
            numOfPages: 0,
        },
    },
};

const RecipeContext = createContext(defaultValues);

export const RecipeProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(recipeReducer, defaultValues);

    const fetchRecipeListByCategory = (categoryId, page, search = '') => {
        dispatchContext(recipeGetListAction());
        getListRecipeByCategoryRequest(categoryId, page, search)
            .then(({ data }) => {
                // const { listRecipeActive = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetListSuccessAction({
                        data: data,
                        extraListInfo: {
                            pageIndex: 1,
                            numOfPages: 0,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeGetListFailureAction(err?.message));
            });
    };

    const fetchRecipeDetail = (id) => {
        dispatchContext(recipeGetDetailAction());
        getRecipeDetailRequest(id)
            .then(({ data }) => {
                dispatchContext(recipeGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(recipeGetDetailFailureAction(err?.message));
            });
    };

    const fetchAdminRecipeList = (page, search = '') => {
        dispatchContext(recipeAdminGetListAction());
        adminGetRecipeListRequest(page, search)
            .then(({ data }) => {
                const { dishFormulaVoList = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeAdminGetListSuccessAction({
                        data: dishFormulaVoList,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeAdminGetListFailureAction(err?.message));
            });
    };

    const fetchRecipeListByName = (name, page, search = '') => {
        dispatchContext(recipeGetListByNameAction());
        getListRecipeByNameRequest(name, page, search)
            .then(({ data }) => {
                // const { listRecipeActive = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetListByNameSuccessAction({
                        data: data,
                        extraListInfo: {
                            pageIndex: 1,
                            numOfPages: 0,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeGetListByNameFailureAction(err?.message));
            });
    };

    const fetchRecipeCategories = () => {
        dispatchContext(recipeGetListCategoryAction());
        getListRecipeCategoriesRequest()
            .then(({ data }) => {
                dispatchContext(recipeGetListCategorySuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(recipeGetListCategoryFailureAction(err?.message));
            });
    };

    const fetchRecipeCommentReportList = (page, search = '') => {
        dispatchContext(recipeGetCommentReportListAction());
        getListReportRecipeCommentRequest(page, search)
            .then(({ data }) => {
                const { recipeCommentAccountVoList = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetCommentReportListSuccessAction({
                        data: recipeCommentAccountVoList,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeGetCommentReportListFailureAction(err?.message));
            });
    };

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                onFetchMoreByCategory: (categoryId, page, search) =>
                    fetchRecipeListByCategory(categoryId, page, search),
                onClearList: () => dispatchContext(recipeClearListAction()),
                onFetchDetail: (id) => fetchRecipeDetail(id),
                onAdminFetchMore: (page, search) => fetchAdminRecipeList(page, search),
                onFetchMoreByName: (name, page, search) => fetchRecipeListByName(name, page, search),
                onFetchRecipeCategories: () => fetchRecipeCategories(),
                onClearDetail: () => dispatchContext(recipeClearDetailAction()),
                onFetchMoreRecipeCommentReport: (page, search) => fetchRecipeCommentReportList(page, search),
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeContext;
