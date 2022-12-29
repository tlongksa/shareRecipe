/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import {
    bmiGetDetailAction,
    bmiGetDetailFailureAction,
    bmiGetDetailSuccessAction,
    clearBmiDetailAction,
    bmiGetMainIngredientsAction,
    bmiGetMainIngredientsSuccessAction,
    bmiGetMainIngredientsFailureAction,
    bmiGetRecipeListAction,
    bmiGetRecipeListSuccessAction,
    bmiGetRecipeListFailureAction,
    clearBmiRecipeListAction,
    bmiInsertRecipeToListAction,
    removeBmiRecipeFromList,
} from './actions';
import bmiReducer from './reducer';
import {
    getUserBmiInfoRequest,
    getUserBmiRecipeListRequest,
    getMainIngredientListRequest,
    getUserBmiRecipeByFavouriteRequest,
    searchMainIngredientListRequest,
    getUserBmiAlternativeListRecipeRequest,
    getBmiRecipesByCaloRequest,
} from '../../api/requests';
import { notification } from 'antd';

export const defaultValues = {
    bmiDetail: {
        dataResponse: {},
        isLoading: false,
        error: null,
    },
    recipes: {
        dataResponse: [],
        isLoading: false,
        error: null,
    },
    mainIngredients: {
        dataResponse: [],
        isLoading: false,
        error: null,
    },
};

const BmiContext = createContext(defaultValues);

export const BmiProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(bmiReducer, defaultValues);

    const fetchBmiDetail = (name) => {
        dispatchContext(bmiGetDetailAction());
        getUserBmiInfoRequest(name)
            .then(({ data }) => {
                dispatchContext(bmiGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(bmiGetDetailFailureAction(err?.response?.data));
            });
    };

    const fetchBmiRecipeList = (totalCalo) => {
        dispatchContext(bmiGetRecipeListAction());
        getUserBmiRecipeListRequest(totalCalo)
            .then(({ data }) => {
                dispatchContext(bmiGetRecipeListSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(bmiGetRecipeListFailureAction(err?.response?.data));
                notification.open({
                    message: err?.response?.data?.message || err?.response?.data?.messContent,
                });
                dispatchContext(clearBmiRecipeListAction());
            });
    };

    const fetchBmiRecipeListByFavourite = (totalCalo, meal, mainIngredient, isRemain, listIDDish = '') => {
        dispatchContext(bmiGetRecipeListAction());

        if (isRemain) {
            getBmiRecipesByCaloRequest(totalCalo, meal, mainIngredient, listIDDish)
                .then(({ data }) => {
                    dispatchContext(bmiInsertRecipeToListAction(data));
                    if (totalCalo < 200) {
                        notification.open({
                            message: 'Danh sách công thức món ăn của bạn đã hoàn thiện',
                        });
                    }
                })
                .catch((err) => {
                    dispatchContext(bmiGetRecipeListFailureAction(err?.response?.data));
                    notification.open({
                        message: err?.response?.data?.messContent || err?.response?.data?.message,
                    });
                });
        } else {
            getUserBmiRecipeByFavouriteRequest(totalCalo, meal, mainIngredient)
                .then(({ data }) => {
                    dispatchContext(bmiGetRecipeListSuccessAction(data));
                })
                .catch((err) => {
                    dispatchContext(bmiGetRecipeListFailureAction(err?.response?.data));
                    notification.open({
                        message: err?.response?.data?.messContent,
                    });
                });
        }
    };

    const fetchMainIngredients = (ing = '', meal = '') => {
        dispatchContext(bmiGetMainIngredientsAction());
        const promise = ing ? searchMainIngredientListRequest(ing) : getMainIngredientListRequest(meal);
        promise
            .then(({ data }) => {
                const ingArr = [];
                if (typeof data === 'string') {
                    ingArr.push(data);
                }
                dispatchContext(bmiGetMainIngredientsSuccessAction(typeof data === 'object' ? data : ingArr));
            })
            .catch((err) => {
                notification.open({
                    message: err?.response?.data?.messContent || err?.response?.data?.message,
                });
                dispatchContext(bmiGetMainIngredientsFailureAction(err?.response?.data));
            });
    };

    const fetchBmiAlternativeRecipeList = (totalCalo, meal, mainIngredient) => {
        dispatchContext(bmiGetRecipeListAction());
        getUserBmiAlternativeListRecipeRequest(totalCalo, meal, mainIngredient)
            .then(({ data }) => {
                dispatchContext(bmiGetRecipeListSuccessAction([{ ...data }]));
            })
            .catch((err) => {
                dispatchContext(bmiGetRecipeListFailureAction(err?.response?.data));
            });
    };

    return (
        <BmiContext.Provider
            value={{
                ...state,
                onFetchDetail: (name) => fetchBmiDetail(name),
                onClearDetail: () => dispatchContext(clearBmiDetailAction()),
                onFetchRecipes: (totalCalo) => fetchBmiRecipeList(totalCalo),
                onRemoveRecipe: (id) => dispatchContext(removeBmiRecipeFromList(id)),
                onFetchMainIngredients: (ing, meal) => fetchMainIngredients(ing, meal),
                onFetchRecipesByFavourite: (totalCalo, meal, mainIngredient, isRemain, listIDDish) =>
                    fetchBmiRecipeListByFavourite(totalCalo, meal, mainIngredient, isRemain, listIDDish),
                onFetchAlternativeRecipes: (totalCalo, meal, mainIngredient) =>
                    fetchBmiAlternativeRecipeList(totalCalo, meal, mainIngredient),
                onClearRecipeList: () => dispatchContext(clearBmiRecipeListAction()),
            }}
        >
            {children}
        </BmiContext.Provider>
    );
};

export default BmiContext;
