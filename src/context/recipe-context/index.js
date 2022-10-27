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
} from './actions';
import recipeReducer from './reducer';
import { getRecipeDetailRequest, getListRecipeByCategoryRequest, adminGetRecipeListRequest } from '../../api/requests';

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
};

const RecipeContext = createContext(defaultValues);

export const RecipeProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(recipeReducer, defaultValues);

    const fetchRecipeListByCategory = (categoryId, page, search = '') => {
        dispatchContext(recipeGetListAction());
        getListRecipeByCategoryRequest(categoryId, page, search)
            .then(({ data }) => {
                const { listRecipeActive = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    recipeGetListSuccessAction({
                        data: listRecipeActive,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
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

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                onFetchMoreByCategory: (categoryId, page, search) =>
                    fetchRecipeListByCategory(categoryId, page, search),
                onClearList: () => dispatchContext(recipeClearListAction()),
                onFetchDetail: (id) => fetchRecipeDetail(id),
                onAdminFetchMore: (page, search) => fetchAdminRecipeList(page, search),
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeContext;
