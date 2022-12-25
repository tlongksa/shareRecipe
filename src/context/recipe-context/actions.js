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
    RECIPE_GET_COMMENT_REPORT_LIST,
    RECIPE_GET_COMMENT_REPORT_LIST_SUCCESS,
    RECIPE_GET_COMMENT_REPORT_LIST_FAILURE,
    RECIPE_GET_FAVOURITE_LIST,
    RECIPE_GET_FAVOURITE_LIST_SUCCESS,
    RECIPE_GET_FAVOURITE_LIST_FAILURE,
    RECIPE_REMOVE_CATEGORY_FROM_LIST_FAILURE,
    RECIPE_REMOVE_FROM_LIST,
    RECIPE_GET_DETAIL_COMMENTS,
    RECIPE_GET_DETAIL_COMMENTS_SUCCESS,
    RECIPE_GET_DETAIL_COMMENTS_FAILURE,
    RECIPE_REMOVE_FROM_FAVOURITE_LIST,
    RECIPE_REMOVE_COMMENT_REPORT_FROM_LIST,
    RECIPE_GET_INGREDIENT_REPORT_LIST,
    RECIPE_GET_INGREDIENT_REPORT_LIST_SUCCESS,
    RECIPE_GET_INGREDIENT_REPORT_LIST_FAILURE,
    RECIPE_REMOVE_FROM_INGREDIENT_REPORT_LIST,
    RECIPE_ADMIN_GET_LIST_BY_CATEGORY,
    RECIPE_ADMIN_GET_LIST_BY_CATEGORY_SUCCESS,
    RECIPE_ADMIN_GET_LIST_BY_CATEGORY_FAILURE,
    RECIPE_SET_FORM_DATA,
    RECIPE_CLEAR_FORM_DATA,
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

const recipeGetCommentReportListAction = () => ({
    type: RECIPE_GET_COMMENT_REPORT_LIST,
});

const recipeGetCommentReportListSuccessAction = (payload) => ({
    type: RECIPE_GET_COMMENT_REPORT_LIST_SUCCESS,
    payload,
});

const recipeGetCommentReportListFailureAction = (error) => ({
    type: RECIPE_GET_COMMENT_REPORT_LIST_FAILURE,
    payload: error,
});

const recipeGetFavouriteListAction = () => ({
    type: RECIPE_GET_FAVOURITE_LIST,
});

const recipeGetFavouriteListSuccessAction = (payload) => ({
    type: RECIPE_GET_FAVOURITE_LIST_SUCCESS,
    payload,
});

const recipeGetFavouriteListFailureAction = (error) => ({
    type: RECIPE_GET_FAVOURITE_LIST_FAILURE,
    payload: error,
});

const removeCategoryItemFromList = (payload) => ({
    type: RECIPE_REMOVE_CATEGORY_FROM_LIST_FAILURE,
    payload,
});

const removeRecipeItemFromList = (payload) => ({
    type: RECIPE_REMOVE_FROM_LIST,
    payload,
});

const recipeGetDetailCommentsAction = () => ({
    type: RECIPE_GET_DETAIL_COMMENTS,
});

const recipeGetDetailCommentsSuccessAction = (payload) => ({
    type: RECIPE_GET_DETAIL_COMMENTS_SUCCESS,
    payload,
});

const recipeGetDetailCommentsFailureAction = (error) => ({
    type: RECIPE_GET_DETAIL_COMMENTS_FAILURE,
    payload: error,
});

const recipeRemoveItemFromFavouriteListAction = (payload) => ({
    type: RECIPE_REMOVE_FROM_FAVOURITE_LIST,
    payload,
});

const removeRecipeCommentReportAction = (payload) => ({
    type: RECIPE_REMOVE_COMMENT_REPORT_FROM_LIST,
    payload,
});

const recipeGetIngReportListAction = () => ({
    type: RECIPE_GET_INGREDIENT_REPORT_LIST,
});

const recipeGetIngReportListSuccessAction = (payload) => ({
    type: RECIPE_GET_INGREDIENT_REPORT_LIST_SUCCESS,
    payload,
});

const recipeGetIngReportListFailureAction = (error) => ({
    type: RECIPE_GET_INGREDIENT_REPORT_LIST_FAILURE,
    payload: error,
});

const removeIngReportItemAction = (payload) => ({
    type: RECIPE_REMOVE_FROM_INGREDIENT_REPORT_LIST,
    payload,
});

const recipeAdminGetListByCategoryAction = () => ({
    type: RECIPE_ADMIN_GET_LIST_BY_CATEGORY,
});

const recipeAdminGetListByCategorySuccessAction = (payload) => ({
    type: RECIPE_ADMIN_GET_LIST_BY_CATEGORY_SUCCESS,
    payload,
});

const recipeAdminGetListByCategoryFailureAction = (error) => ({
    type: RECIPE_ADMIN_GET_LIST_BY_CATEGORY_FAILURE,
    payload: error,
});

const recipeSetFormDataAction = (payload) => ({
    type: RECIPE_SET_FORM_DATA,
    payload,
});

const recipeClearFormDataAction = () => ({
    type: RECIPE_CLEAR_FORM_DATA,
});

export {
    recipeAdminGetListByCategoryAction,
    recipeAdminGetListByCategorySuccessAction,
    recipeAdminGetListByCategoryFailureAction,
    recipeGetIngReportListAction,
    recipeGetIngReportListSuccessAction,
    recipeGetIngReportListFailureAction,
    removeIngReportItemAction,
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
    recipeSetFormDataAction,
    recipeClearFormDataAction,
};
