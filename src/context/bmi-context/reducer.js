import {
    BMI_GET_DETAIL,
    BMI_GET_DETAIL_FAILURE,
    BMI_GET_DETAIL_SUCCESS,
    BMI_DETAIL_CLEAR,
    BMI_GET_RECIPE_LIST,
    BMI_GET_RECIPE_LIST_SUCCESS,
    BMI_GET_RECIPE_LIST_FAILURE,
    BMI_CLEAR_RECIPE_LIST,
    BMI_GET_MAIN_INGREDIENTS,
    BMI_GET_MAIN_INGREDIENTS_SUCCESS,
    BMI_GET_MAIN_INGREDIENTS_FAILURE,
    BMI_UPDATE_SUCCESS,
    BMI_INSERT_RECIPE_TO_LIST,
    BMI_REMOVE_RECIPE_FROM_LIST,
} from './types';
import produce from 'immer';
import { defaultValues } from '.';

const bmiReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case BMI_GET_DETAIL:
                draft.bmiDetail.isLoading = true;
                draft.bmiDetail.error = null;
                break;
            case BMI_GET_DETAIL_SUCCESS:
                draft.bmiDetail.dataResponse = payload;
                draft.bmiDetail.error = null;
                draft.bmiDetail.isLoading = false;
                break;
            case BMI_GET_DETAIL_FAILURE:
                draft.bmiDetail.error = payload;
                draft.bmiDetail.isLoading = false;
                break;
            case BMI_DETAIL_CLEAR:
                draft.bmiDetail = {
                    dataResponse: {},
                    isLoading: false,
                    error: null,
                };
                break;
            case BMI_GET_RECIPE_LIST:
                draft.recipes.isLoading = true;
                draft.recipes.error = null;
                break;
            case BMI_GET_RECIPE_LIST_SUCCESS:
                draft.recipes.dataResponse = payload;
                draft.recipes.error = null;
                draft.recipes.isLoading = false;
                break;
            case BMI_GET_RECIPE_LIST_FAILURE:
                draft.recipes.error = payload;
                draft.recipes.isLoading = false;
                break;
            case BMI_CLEAR_RECIPE_LIST:
                draft.recipes = {
                    dataResponse: [],
                    isLoading: false,
                    error: null,
                };
                break;
            case BMI_REMOVE_RECIPE_FROM_LIST:
                draft.recipes.dataResponse = draft.recipes.dataResponse.filter((it) => it.dishID !== payload);
                break;
            case BMI_GET_MAIN_INGREDIENTS:
                draft.mainIngredients.isLoading = true;
                draft.mainIngredients.error = null;
                break;
            case BMI_GET_MAIN_INGREDIENTS_SUCCESS:
                draft.mainIngredients.dataResponse = payload;
                draft.mainIngredients.error = null;
                draft.mainIngredients.isLoading = false;
                break;
            case BMI_GET_MAIN_INGREDIENTS_FAILURE:
                draft.mainIngredients.error = payload;
                draft.mainIngredients.isLoading = false;
                break;
            case BMI_UPDATE_SUCCESS:
                draft.bmiDetail.dataResponse.high = payload.high;
                draft.bmiDetail.dataResponse.weight = payload.weight;
                draft.bmiDetail.dataResponse.mobility = payload.mobility;
                draft.bmiDetail.dataResponse.target = payload.target;
                break;
            case BMI_INSERT_RECIPE_TO_LIST:
                draft.recipes.dataResponse = draft.recipes.dataResponse.concat(payload);
                draft.recipes.error = null;
                draft.recipes.isLoading = false;
                break;
            default:
                break;
        }
    });

export default bmiReducer;
