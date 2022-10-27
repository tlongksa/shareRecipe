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
                if (draft.adminRecipeExtraListInfo.numOfPages === 0) {
                    draft.adminRecipeList = payload?.data;
                } else {
                    draft.adminRecipeList = draft.adminRecipeList.concat(payload?.data);
                }
                draft.adminRecipeExtraListInfo = payload.extraListInfo;
                break;
            case RECIPE_ADMIN_GET_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    });

export default recipeReducer;
