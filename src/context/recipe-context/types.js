const recipeCtxKey = '__recipeCtx__';

const RECIPE_GET_LIST = `${recipeCtxKey}/RECIPE_GET_LIST`;
const RECIPE_GET_LIST_SUCCESS = `${recipeCtxKey}/RECIPE_GET_LIST_SUCCESS`;
const RECIPE_GET_LIST_FAILURE = `${recipeCtxKey}/RECIPE_GET_LIST_FAILURE`;
const RECIPE_CLEAR_LIST = `${recipeCtxKey}/RECIPE_CLEAR_LIST`;

const RECIPE_GET_DETAIL = `${recipeCtxKey}/RECIPE_GET_DETAIL`;
const RECIPE_GET_DETAIL_SUCCESS = `${recipeCtxKey}/RECIPE_GET_DETAIL_SUCCESS`;
const RECIPE_GET_DETAIL_FAILURE = `${recipeCtxKey}/RECIPE_GET_DETAIL_FAILURE`;
const RECIPE_CLEAR_DETAIL = `${recipeCtxKey}/RECIPE_CLEAR_DETAIL`;

const RECIPE_ADMIN_GET_LIST = `${recipeCtxKey}/RECIPE_ADMIN_GET_LIST`;
const RECIPE_ADMIN_GET_LIST_SUCCESS = `${recipeCtxKey}/RECIPE_ADMIN_GET_LIST_SUCCESS`;
const RECIPE_ADMIN_GET_LIST_FAILURE = `${recipeCtxKey}/RECIPE_ADMIN_GET_LIST_FAILURE`;

const RECIPE_GET_LIST_BY_NAME = `${recipeCtxKey}/RECIPE_GET_LIST_BY_NAME`;
const RECIPE_GET_LIST_BY_NAME_SUCCESS = `${recipeCtxKey}/RECIPE_GET_LIST_BY_NAME_SUCCESS`;
const RECIPE_GET_LIST_BY_NAME_FAILURE = `${recipeCtxKey}/RECIPE_GET_LIST_BY_NAME_FAILURE`;

const RECIPE_GET_CATEGORY_LIST = `${recipeCtxKey}/RECIPE_GET_CATEGORY_LIST`;
const RECIPE_GET_CATEGORY_LIST_SUCCESS = `${recipeCtxKey}/RECIPE_GET_CATEGORY_LIST_SUCCESS`;
const RECIPE_GET_CATEGORY_LIST_FAILURE = `${recipeCtxKey}/RECIPE_GET_CATEGORY_LIST_FAILURE`;

const RECIPE_GET_COMMENT_REPORT_LIST = `${recipeCtxKey}/RECIPE_GET_COMMENT_REPORT_LIST`;
const RECIPE_GET_COMMENT_REPORT_LIST_SUCCESS = `${recipeCtxKey}/RECIPE_GET_COMMENT_REPORT_LIST_SUCCESS`;
const RECIPE_GET_COMMENT_REPORT_LIST_FAILURE = `${recipeCtxKey}/RECIPE_GET_COMMENT_REPORT_LIST_FAILURE`;

const RECIPE_GET_FAVOURITE_LIST = `${recipeCtxKey}/RECIPE_GET_FAVOURITE_LIST`;
const RECIPE_GET_FAVOURITE_LIST_SUCCESS = `${recipeCtxKey}/RECIPE_GET_FAVOURITE_LIST_SUCCESS`;
const RECIPE_GET_FAVOURITE_LIST_FAILURE = `${recipeCtxKey}/RECIPE_GET_FAVOURITE_LIST_FAILURE`;

export {
    RECIPE_GET_LIST,
    RECIPE_GET_LIST_FAILURE,
    RECIPE_GET_LIST_SUCCESS,
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
};
