/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useReducer } from 'react';
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
    recipeGetFavouriteListAction,
    recipeGetFavouriteListSuccessAction,
    recipeGetFavouriteListFailureAction,
    removeCategoryItemFromList,
    removeRecipeItemFromList,
    recipeGetDetailCommentsAction,
    recipeGetDetailCommentsSuccessAction,
    recipeGetDetailCommentsFailureAction,
    recipeRemoveItemFromFavouriteListAction,
    removeRecipeCommentReportAction,
} from './actions';
import recipeReducer from './reducer';
import {
    getRecipeDetailRequest,
    getListRecipeByCategoryRequest,
    adminGetRecipeListRequest,
    getListRecipeByNameRequest,
    getListRecipeCategoriesRequest,
    getListReportRecipeCommentRequest,
    getFavouriteRecipeListRequest,
    modeGetRecipeListRequest,
    getRecipeCommentsRequest,
} from '../../api/requests';
import AuthContext from '../auth-context';
import { ROLES } from '../../App';

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
        comments: {
            list: [],
            isLoading: false,
            error: null,
            extraListInfo: {
                pageIndex: 1,
                numOfPages: 0,
            },
        },
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
    favouriteRecipeList: [],
    favouriteRecipeExtraListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
};

const RecipeContext = createContext(defaultValues);

export const RecipeProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(recipeReducer, defaultValues);
    const {
        userInfo: { roles, username },
    } = useContext(AuthContext);

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
                dispatchContext(recipeGetListFailureAction(err?.response?.data));
            });
    };

    const fetchRecipeDetail = (id) => {
        dispatchContext(recipeGetDetailAction());
        getRecipeDetailRequest(id)
            .then(({ data }) => {
                dispatchContext(recipeGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(recipeGetDetailFailureAction(err?.response?.data));
            });
    };

    const fetchRecipeCommentList = (id, page) => {
        dispatchContext(recipeGetDetailCommentsAction());
        getRecipeCommentsRequest(id, page)
            .then(({ data }) => {
                const { dishCommentAccountVoList = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetDetailCommentsSuccessAction({
                        data: dishCommentAccountVoList,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeGetDetailCommentsFailureAction(err?.response?.data));
            });
    };

    const fetchAdminRecipeList = (page, search = '') => {
        dispatchContext(recipeAdminGetListAction());
        const promise =
            roles === ROLES.mod
                ? modeGetRecipeListRequest(username, page, search)
                : adminGetRecipeListRequest(page, search);
        promise
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
                dispatchContext(recipeAdminGetListFailureAction(err?.response?.data));
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
                dispatchContext(recipeGetListByNameFailureAction(err?.response?.data));
            });
    };

    const fetchRecipeCategories = () => {
        dispatchContext(recipeGetListCategoryAction());
        getListRecipeCategoriesRequest()
            .then(({ data }) => {
                dispatchContext(recipeGetListCategorySuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(recipeGetListCategoryFailureAction(err?.response?.data));
            });
    };

    const fetchRecipeCommentReportList = (page, search = '') => {
        dispatchContext(recipeGetCommentReportListAction());
        getListReportRecipeCommentRequest(page, search)
            .then(({ data }) => {
                const { dishCommentAccountVoList = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetCommentReportListSuccessAction({
                        data: dishCommentAccountVoList,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeGetCommentReportListFailureAction(err?.response?.data));
            });
    };

    const fetchFavouriteRecipeList = (page, search = '') => {
        dispatchContext(recipeGetFavouriteListAction());
        getFavouriteRecipeListRequest(page, search)
            .then(({ data }) => {
                const { listAccountActive = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetFavouriteListSuccessAction({
                        data: listAccountActive,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(recipeGetFavouriteListFailureAction(err?.response?.data));
            });
    };

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                onFetchMoreByCategory: (categoryId, page, search) =>
                    fetchRecipeListByCategory(categoryId, page, search),
                onClearList: () => dispatchContext(recipeClearListAction()),
                onRemoveItemFromList: (id) => dispatchContext(removeRecipeItemFromList(id)),
                onFetchDetail: (id) => fetchRecipeDetail(id),
                onAdminFetchMore: (page, search) => fetchAdminRecipeList(page, search),
                onFetchMoreByName: (name, page, search) => fetchRecipeListByName(name, page, search),
                onFetchRecipeCategories: () => fetchRecipeCategories(),
                onClearDetail: () => dispatchContext(recipeClearDetailAction()),
                onFetchMoreRecipeCommentReport: (page, search) => fetchRecipeCommentReportList(page, search),
                onFetchFavouriteMore: (page, search) => fetchFavouriteRecipeList(page, search),
                onRemoveCategoryFromList: (id) => dispatchContext(removeCategoryItemFromList(id)),
                onFetchRecipeComments: (id, page) => fetchRecipeCommentList(id, page),
                onRemoveItemFromFavouriteList: (id) => dispatchContext(recipeRemoveItemFromFavouriteListAction(id)),
                onRemoveRecipeCommentReport: (id) => dispatchContext(removeRecipeCommentReportAction(id)),
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeContext;
