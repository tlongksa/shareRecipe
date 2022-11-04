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
import { getUserBmiInfoRequest, getUserBmiRecipeListRequest, getMainIngredientListRequest } from '../../api/requests';

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
                dispatchContext(bmiGetDetailFailureAction(err?.message));
            });
    };

    const fetchBmiRecipeList = (totalCalo) => {
        dispatchContext(bmiGetRecipeListAction());
        getUserBmiRecipeListRequest(totalCalo)
            .then(({ data }) => {
                dispatchContext(bmiGetRecipeListSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(bmiGetRecipeListFailureAction(err?.message));
            });
    };

    const fetchMainIngredients = () => {
        dispatchContext(bmiGetMainIngredientsAction());
        getMainIngredientListRequest()
            .then(({ data }) => {
                dispatchContext(bmiGetMainIngredientsSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(bmiGetMainIngredientsFailureAction(err?.message));
            });
    };

    return (
        <BmiContext.Provider
            value={{
                ...state,
                onFetchDetail: (name) => fetchBmiDetail(name),
                onClearDetail: () => dispatchContext(clearBmiDetailAction()),
                onFetchRecipes: (totalCalo) => fetchBmiRecipeList(totalCalo),
                onFetchMainIngredients: () => fetchMainIngredients(),
            }}
        >
            {children}
        </BmiContext.Provider>
    );
};

export default BmiContext;
