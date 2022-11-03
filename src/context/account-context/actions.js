import {
    ACCOUNT_GET_LIST,
    ACCOUNT_GET_LIST_SUCCESS,
    ACCOUNT_GET_LIST_FAILURE,
    ACCOUNT_CLEAR_LIST,
    ACCOUNT_GET_DETAIL,
    ACCOUNT_GET_DETAIL_FAILURE,
    ACCOUNT_GET_DETAIL_SUCCESS,
    ACCOUNT_REMOVE_LIST_ITEM,
    ACCOUNT_UPDATE_ROLE_SUCESS,
} from './types';

const accountGetListAction = () => ({
    type: ACCOUNT_GET_LIST,
});

const accountGetListSuccessAction = (payload) => ({
    type: ACCOUNT_GET_LIST_SUCCESS,
    payload,
});

const accountGetListFailureAction = (error) => ({
    type: ACCOUNT_GET_LIST_FAILURE,
    payload: error,
});

const accountClearListAction = () => ({
    type: ACCOUNT_CLEAR_LIST,
});

const accountGetDetailAction = () => ({
    type: ACCOUNT_GET_DETAIL,
});

const accountGetDetailSuccessAction = (payload) => ({
    type: ACCOUNT_GET_DETAIL_SUCCESS,
    payload,
});

const accountGetDetailFailureAction = (error) => ({
    type: ACCOUNT_GET_DETAIL_FAILURE,
    payload: error,
});

const accountRemoveListItemAction = (payload) => ({
    type: ACCOUNT_REMOVE_LIST_ITEM,
    payload,
});

const accountUpdateRoleSuccessAction = (payload) => ({
    type: ACCOUNT_UPDATE_ROLE_SUCESS,
    payload,
});

export {
    accountGetListAction,
    accountGetListSuccessAction,
    accountGetListFailureAction,
    accountClearListAction,
    accountGetDetailAction,
    accountGetDetailSuccessAction,
    accountGetDetailFailureAction,
    accountRemoveListItemAction,
    accountUpdateRoleSuccessAction,
};
