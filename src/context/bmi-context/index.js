/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import {
    bmiGetDetailAction,
    bmiGetDetailFailureAction,
    bmiGetDetailSuccessAction,
    clearBmiDetailAction,
} from './actions';
import bmiReducer from './reducer';
import { getUserBmiInfoRequest } from '../../api/requests';

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
};

const BmiContext = createContext(defaultValues);

export const BmiProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(bmiReducer, defaultValues);

    const fetchBmiDetail = (name) => {
        dispatchContext(bmiGetDetailAction());
        getUserBmiInfoRequest(name)
            .then(({ data }) => {
                console.log(data);
                dispatchContext(bmiGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(bmiGetDetailFailureAction(err?.message));
            });
    };

    return (
        <BmiContext.Provider
            value={{
                ...state,
                onFetchDetail: (name) => fetchBmiDetail(name),
                onClearDetail: () => dispatchContext(clearBmiDetailAction()),
            }}
        >
            {children}
        </BmiContext.Provider>
    );
};

export default BmiContext;
