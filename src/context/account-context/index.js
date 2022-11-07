/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from 'react';
import {
    accountGetListAction,
    accountGetListSuccessAction,
    accountGetListFailureAction,
    accountClearListAction,
    accountGetDetailAction,
    accountGetDetailFailureAction,
    accountGetDetailSuccessAction,
    accountRemoveListItemAction,
    accountUpdateRoleSuccessAction,
} from './actions';
import accountReducer from './reducer';
import { getAccountDetailRequest, getListAccountRequest } from '../../api/requests';

export const defaultValues = {
    list: [],
    isLoading: false,
    error: null,
    extraListInfo: {
        pageIndex: 1,
        numOfPages: 0,
    },
    accountDetail: {
        dataResponse: {},
        isLoading: false,
        error: null,
    },
};

const AccountContext = createContext(defaultValues);

export const AccountProvider = ({ children }) => {
    const [state, dispatchContext] = useReducer(accountReducer, defaultValues);

    const fetchAccountList = (page, search = '') => {
        dispatchContext(accountGetListAction());
        getListAccountRequest(page, search)
            .then(({ data }) => {
                const { listAccountActive = [], pageIndex, numOfPages } = data;
                dispatchContext(
                    accountGetListSuccessAction({
                        data: listAccountActive,
                        extraListInfo: {
                            pageIndex,
                            numOfPages,
                        },
                    }),
                );
            })
            .catch((err) => {
                dispatchContext(accountGetListFailureAction(err?.response?.data));
            });
    };

    const fetchAccountDetail = (id) => {
        dispatchContext(accountGetDetailAction());
        getAccountDetailRequest(id)
            .then(({ data }) => {
                dispatchContext(accountGetDetailSuccessAction(data));
            })
            .catch((err) => {
                dispatchContext(accountGetDetailFailureAction(err?.response?.data));
            });
    };

    return (
        <AccountContext.Provider
            value={{
                ...state,
                onFetchMore: (page, search) => fetchAccountList(page, search),
                onClearList: () => dispatchContext(accountClearListAction()),
                onFetchDetail: (id) => fetchAccountDetail(id),
                onRemoveItem: (id) => dispatchContext(accountRemoveListItemAction(id)),
                onUpdateRole: (userId, newRole) => dispatchContext(accountUpdateRoleSuccessAction({ userId, newRole })),
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContext;
