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

const bmiGetDetailAction = () => ({
    type: BMI_GET_DETAIL,
});

const bmiGetDetailSuccessAction = (payload) => ({
    type: BMI_GET_DETAIL_SUCCESS,
    payload,
});

const bmiGetDetailFailureAction = (error) => ({
    type: BMI_GET_DETAIL_FAILURE,
    payload: error,
});

const clearBmiDetailAction = () => ({
    type: BMI_DETAIL_CLEAR,
});

const bmiGetRecipeListAction = () => ({
    type: BMI_GET_RECIPE_LIST,
});

const bmiGetRecipeListSuccessAction = (payload) => ({
    type: BMI_GET_RECIPE_LIST_SUCCESS,
    payload,
});

const bmiInsertRecipeToListAction = (payload) => ({
    type: BMI_INSERT_RECIPE_TO_LIST,
    payload,
});

const bmiGetRecipeListFailureAction = (error) => ({
    type: BMI_GET_RECIPE_LIST_FAILURE,
    payload: error,
});

const clearBmiRecipeListAction = () => ({
    type: BMI_CLEAR_RECIPE_LIST,
});

const bmiGetMainIngredientsAction = () => ({
    type: BMI_GET_MAIN_INGREDIENTS,
});

const bmiGetMainIngredientsSuccessAction = (payload) => ({
    type: BMI_GET_MAIN_INGREDIENTS_SUCCESS,
    payload,
});

const bmiGetMainIngredientsFailureAction = (error) => ({
    type: BMI_GET_MAIN_INGREDIENTS_FAILURE,
    payload: error,
});

const updateBmiInfoSuccess = (payload) => ({
    type: BMI_UPDATE_SUCCESS,
    payload,
});

const removeBmiRecipeFromList = (payload) => ({
    type: BMI_REMOVE_RECIPE_FROM_LIST,
    payload,
});

export {
    bmiGetDetailAction,
    bmiGetDetailSuccessAction,
    bmiGetDetailFailureAction,
    clearBmiDetailAction,
    bmiGetRecipeListAction,
    bmiGetRecipeListSuccessAction,
    bmiGetRecipeListFailureAction,
    clearBmiRecipeListAction,
    bmiGetMainIngredientsAction,
    bmiGetMainIngredientsSuccessAction,
    bmiGetMainIngredientsFailureAction,
    updateBmiInfoSuccess,
    bmiInsertRecipeToListAction,
    removeBmiRecipeFromList,
};
