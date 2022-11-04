import {
    RECIPE_GET_LIST,
    RECIPE_GET_LIST_SUCCESS,
    RECIPE_GET_LIST_FAILURE,
    RECIPE_CLEAR_LIST,
    RECIPE_GET_DETAIL,
    RECIPE_GET_DETAIL_FAILURE,
    RECIPE_GET_DETAIL_SUCCESS,
    RECIPE_ADMIN_GET_LIST,
    RECIPE_ADMIN_GET_LIST_FAILURE,
    RECIPE_ADMIN_GET_LIST_SUCCESS,
    RECIPE_GET_LIST_BY_NAME,
    RECIPE_GET_LIST_BY_NAME_FAILURE,
    RECIPE_GET_LIST_BY_NAME_SUCCESS,
    RECIPE_GET_CATEGORY_LIST,
    RECIPE_GET_CATEGORY_LIST_SUCCESS,
    RECIPE_GET_CATEGORY_LIST_FAILURE,
    RECIPE_CLEAR_DETAIL,
} from './types';

const recipeGetListAction = () => ({
    type: RECIPE_GET_LIST,
});

const recipeGetListSuccessAction = (payload) => ({
    type: RECIPE_GET_LIST_SUCCESS,
    payload,
});

const recipeGetListFailureAction = (error) => ({
    type: RECIPE_GET_LIST_FAILURE,
    payload: error,
});

const recipeClearListAction = () => ({
    type: RECIPE_CLEAR_LIST,
});

const recipeGetDetailAction = () => ({
    type: RECIPE_GET_DETAIL,
});

const recipeGetDetailSuccessAction = (payload) => ({
    type: RECIPE_GET_DETAIL_SUCCESS,
    payload,
});

const recipeGetDetailFailureAction = (error) => ({
    type: RECIPE_GET_DETAIL_FAILURE,
    payload: error,
});

const recipeAdminGetListAction = () => ({
    type: RECIPE_ADMIN_GET_LIST,
});

const recipeAdminGetListSuccessAction = (payload) => ({
    type: RECIPE_ADMIN_GET_LIST_SUCCESS,
    payload,
});

const recipeAdminGetListFailureAction = (error) => ({
    type: RECIPE_ADMIN_GET_LIST_FAILURE,
    payload: error,
});

const recipeGetListByNameAction = () => ({
    type: RECIPE_GET_LIST_BY_NAME,
});

const recipeGetListByNameSuccessAction = (payload) => ({
    type: RECIPE_GET_LIST_BY_NAME_SUCCESS,
    payload,
});

const recipeGetListByNameFailureAction = (error) => ({
    type: RECIPE_GET_LIST_BY_NAME_FAILURE,
    payload: error,
});

const recipeGetListCategoryAction = () => ({
    type: RECIPE_GET_CATEGORY_LIST,
});

const recipeGetListCategorySuccessAction = (payload) => ({
    type: RECIPE_GET_CATEGORY_LIST_SUCCESS,
    payload,
});

const recipeGetListCategoryFailureAction = (error) => ({
    type: RECIPE_GET_CATEGORY_LIST_FAILURE,
    payload: error,
});

const recipeClearDetailAction = () => ({
    type: RECIPE_CLEAR_DETAIL,
});

export {
    recipeGetListAction,
    recipeGetListSuccessAction,
    recipeGetListFailureAction,
    recipeClearListAction,
    recipeGetDetailAction,
    recipeGetDetailSuccessAction,
    recipeGetDetailFailureAction,
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
};
