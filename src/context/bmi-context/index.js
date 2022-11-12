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
} from './actions';
import bmiReducer from './reducer';
import {
    getUserBmiInfoRequest,
    getUserBmiRecipeListRequest,
    getMainIngredientListRequest,
    getUserBmiRecipeByFavouriteRequest,
    searchMainIngredientListRequest,
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
            });
    };

    const fetchBmiRecipeListByFavourite = (totalCalo, meal, mainIngredient) => {
        dispatchContext(bmiGetRecipeListAction());
        getUserBmiRecipeByFavouriteRequest(totalCalo, meal, mainIngredient)
            .then(({ data }) => {
                dispatchContext(bmiGetRecipeListSuccessAction([data]));
            })
            .catch((err) => {
                dispatchContext(bmiGetRecipeListFailureAction(err?.response?.data));
            });
    };

    const fetchMainIngredients = (ing = '') => {
        dispatchContext(bmiGetMainIngredientsAction());
        const promise = ing ? searchMainIngredientListRequest(ing) : getMainIngredientListRequest();
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
                    message: err?.response?.data?.messContent,
                });
                dispatchContext(bmiGetMainIngredientsFailureAction(err?.response?.data));
            });
    };

    return (
        <BmiContext.Provider
            value={{
                ...state,
                onFetchDetail: (name) => fetchBmiDetail(name),
                onClearDetail: () => dispatchContext(clearBmiDetailAction()),
                onFetchRecipes: (totalCalo) => fetchBmiRecipeList(totalCalo),
                onFetchMainIngredients: (ing) => fetchMainIngredients(ing),
                onFetchRecipesByFavourite: (totalCalo, meal, mainIngredient) =>
                    fetchBmiRecipeListByFavourite(totalCalo, meal, mainIngredient),
            }}
        >
            {children}
        </BmiContext.Provider>
    );
};

export default BmiContext;
