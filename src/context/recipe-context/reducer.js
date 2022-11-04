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
} from './types';
import produce from 'immer';
import { defaultValues } from '.';

const recipeReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case RECIPE_GET_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case RECIPE_GET_LIST_SUCCESS:
                draft.isLoading = false;
                if (draft.extraListInfo.numOfPages === 0) {
                    draft.list = payload?.data;
                } else {
                    draft.list = draft.list.concat(payload?.data);
                }
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
                if (draft.recipeByNameExtraListInfo.numOfPages === 0) {
                    draft.recipeByNameList = payload?.data;
                } else {
                    draft.recipeByNameList = draft.recipeByNameList.concat(payload?.data);
                }
                draft.recipeByNameExtraListInfo = payload.extraListInfo;
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
                draft.recipeDetail = {
                    dataResponse: {},
                    isLoading: false,
                    error: null,
                };
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
            default:
                break;
        }
    });

export default recipeReducer;
