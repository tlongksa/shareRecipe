import {
    RECIPE_GET_LIST,
    RECIPE_GET_LIST_FAILURE,
    RECIPE_GET_LIST_SUCCESS,
    RECIPE_CLEAR_LIST,
    RECIPE_GET_DETAIL,
    RECIPE_GET_DETAIL_FAILURE,
    RECIPE_GET_DETAIL_SUCCESS,
    RECIPE_ADMIN_GET_LIST,
    RECIPE_ADMIN_GET_LIST_SUCCESS,
    RECIPE_ADMIN_GET_LIST_FAILURE,
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
    RECIPE_REMOVE_FROM_LIST,
    RECIPE_REMOVE_CATEGORY_FROM_LIST_FAILURE,
    RECIPE_GET_DETAIL_COMMENTS,
    RECIPE_GET_DETAIL_COMMENTS_SUCCESS,
    RECIPE_GET_DETAIL_COMMENTS_FAILURE,
    RECIPE_REMOVE_FROM_FAVOURITE_LIST,
    RECIPE_REMOVE_COMMENT_REPORT_FROM_LIST,
    RECIPE_GET_INGREDIENT_REPORT_LIST,
    RECIPE_GET_INGREDIENT_REPORT_LIST_SUCCESS,
    RECIPE_GET_INGREDIENT_REPORT_LIST_FAILURE,
    RECIPE_REMOVE_FROM_INGREDIENT_REPORT_LIST,
    RECIPE_SET_FORM_DATA,
    RECIPE_CLEAR_FORM_DATA,
} from './types';
import produce from 'immer';
import { defaultValues, initialRecipeFormData } from '.';

const recipeReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case RECIPE_GET_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case RECIPE_GET_LIST_SUCCESS:
                draft.isLoading = false;
                draft.list = payload?.data;
                draft.extraListInfo = payload.extraListInfo;
                break;
            case RECIPE_GET_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            case RECIPE_CLEAR_LIST:
                draft.list = [];
                draft.extraListInfo = {
                    pageIndex: 1,
                    numOfPages: 0,
                };
                break;
            case RECIPE_GET_DETAIL:
                draft.recipeDetail.isLoading = true;
                draft.recipeDetail.error = null;
                break;
            case RECIPE_GET_DETAIL_SUCCESS:
                draft.recipeDetail.dataResponse = payload;
                draft.recipeDetail.error = null;
                draft.recipeDetail.isLoading = false;
                break;
            case RECIPE_GET_DETAIL_FAILURE:
                draft.recipeDetail.error = payload;
                draft.recipeDetail.isLoading = false;
                break;
            case RECIPE_ADMIN_GET_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case RECIPE_ADMIN_GET_LIST_SUCCESS:
                draft.isLoading = false;
                draft.adminRecipeList = payload?.data;
                draft.adminRecipeExtraListInfo = payload.extraListInfo;
                break;
            case RECIPE_ADMIN_GET_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            case RECIPE_GET_LIST_BY_NAME:
                draft.isLoading = true;
                draft.error = null;
                break;
            case RECIPE_GET_LIST_BY_NAME_SUCCESS:
                draft.isLoading = false;
                draft.recipeByNameList = payload?.data;
                draft.recipeByNameExtraListInfo = payload?.extraListInfo;
                break;
            case RECIPE_GET_LIST_BY_NAME_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            case RECIPE_GET_CATEGORY_LIST:
                draft.categories.isLoading = true;
                draft.categories.error = null;
                break;
            case RECIPE_GET_CATEGORY_LIST_SUCCESS:
                draft.categories.isLoading = false;
                draft.categories.list = payload;
                break;
            case RECIPE_GET_CATEGORY_LIST_FAILURE:
                draft.categories.isLoading = false;
                draft.categories.error = payload;
                break;
            case RECIPE_CLEAR_DETAIL:
                draft.recipeDetail.dataResponse = {};
                draft.recipeDetail.isLoading = false;
                draft.recipeDetail.error = null;
                break;
            case RECIPE_GET_COMMENT_REPORT_LIST:
                draft.recipeCommentReport.isLoading = true;
                draft.recipeCommentReport.error = null;
                break;
            case RECIPE_GET_COMMENT_REPORT_LIST_SUCCESS:
                draft.recipeCommentReport.isLoading = false;
                draft.recipeCommentReport.list = payload?.data || [];
                draft.recipeCommentReport.extraListInfo = payload.extraListInfo;
                break;
            case RECIPE_GET_COMMENT_REPORT_LIST_FAILURE:
                draft.recipeCommentReport.isLoading = false;
                draft.recipeCommentReport.error = payload;
                break;
            case RECIPE_GET_FAVOURITE_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case RECIPE_GET_FAVOURITE_LIST_SUCCESS:
                draft.isLoading = false;
                draft.favouriteRecipeList = payload?.data;
                draft.favouriteRecipeExtraListInfo = payload.extraListInfo;
                break;
            case RECIPE_GET_FAVOURITE_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            case RECIPE_REMOVE_FROM_LIST:
                draft.adminRecipeList = draft.adminRecipeList.filter((item) => item.dishID !== payload);
                break;
            case RECIPE_REMOVE_CATEGORY_FROM_LIST_FAILURE:
                draft.categories.list = draft.categories.list.filter((item) => item.dishCategoryID !== payload);
                break;
            case RECIPE_GET_DETAIL_COMMENTS:
                draft.recipeDetail.comments.isLoading = true;
                draft.recipeDetail.comments.error = null;
                break;
            case RECIPE_GET_DETAIL_COMMENTS_SUCCESS:
                draft.recipeDetail.comments.isLoading = false;
                draft.recipeDetail.comments.list = payload?.data;
                draft.recipeDetail.comments.extraListInfo = payload.extraListInfo;
                break;
            case RECIPE_GET_DETAIL_COMMENTS_FAILURE:
                draft.recipeDetail.comments.isLoading = false;
                draft.recipeDetail.comments.error = payload;
                break;
            case RECIPE_REMOVE_FROM_FAVOURITE_LIST:
                draft.favouriteRecipeList = draft.favouriteRecipeList.filter((item) => item.dishId !== payload);
                break;
            case RECIPE_REMOVE_COMMENT_REPORT_FROM_LIST:
                draft.recipeCommentReport.list = draft.recipeCommentReport.list.filter(
                    (item) => item.dishCommentID !== payload,
                );
                break;
            case RECIPE_GET_INGREDIENT_REPORT_LIST:
                draft.ingReport.isLoading = true;
                draft.ingReport.error = null;
                break;
            case RECIPE_GET_INGREDIENT_REPORT_LIST_SUCCESS:
                draft.ingReport.isLoading = false;
                draft.ingReport.list = payload?.data || [];
                draft.ingReport.extraListInfo = payload.extraListInfo;
                break;
            case RECIPE_GET_INGREDIENT_REPORT_LIST_FAILURE:
                draft.ingReport.isLoading = false;
                draft.ingReport.error = payload;
                break;
            case RECIPE_REMOVE_FROM_INGREDIENT_REPORT_LIST:
                draft.ingReport.list = draft.ingReport.list.filter((item) => item.ingredientConflictId !== payload);
                break;
            case RECIPE_CLEAR_FORM_DATA:
                draft.recipeFormData = initialRecipeFormData;
                break;
            case RECIPE_SET_FORM_DATA:
                draft.recipeFormData = payload;
                break;
            default:
                break;
        }
    });

export default recipeReducer;
