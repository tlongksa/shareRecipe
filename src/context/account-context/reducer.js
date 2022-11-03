import {
    ACCOUNT_GET_LIST,
    ACCOUNT_GET_LIST_FAILURE,
    ACCOUNT_GET_LIST_SUCCESS,
    ACCOUNT_CLEAR_LIST,
    ACCOUNT_GET_DETAIL,
    ACCOUNT_GET_DETAIL_FAILURE,
    ACCOUNT_GET_DETAIL_SUCCESS,
    ACCOUNT_REMOVE_LIST_ITEM,
    ACCOUNT_UPDATE_ROLE_SUCESS,
} from './types';
import produce from 'immer';
import { defaultValues } from '.';
import { ROLES } from '../../App';

const accountReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case ACCOUNT_GET_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case ACCOUNT_GET_LIST_SUCCESS:
                draft.isLoading = false;
                draft.list = payload?.data;
                draft.extraListInfo = payload.extraListInfo;
                break;
            case ACCOUNT_GET_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            case ACCOUNT_CLEAR_LIST:
                draft.list = [];
                draft.extraListInfo = {
                    pageIndex: 1,
                    numOfPages: 0,
                };
                break;
            case ACCOUNT_GET_DETAIL:
                draft.accountDetail.isLoading = true;
                draft.accountDetail.error = null;
                break;
            case ACCOUNT_GET_DETAIL_SUCCESS:
                draft.accountDetail.dataResponse = payload;
                draft.accountDetail.error = null;
                draft.accountDetail.isLoading = false;
                break;
            case ACCOUNT_GET_DETAIL_FAILURE:
                draft.accountDetail.error = payload;
                draft.accountDetail.isLoading = false;
                break;
            case ACCOUNT_REMOVE_LIST_ITEM:
                draft.list = draft.list.filter((acc) => acc.accountId !== payload);
                break;
            case ACCOUNT_UPDATE_ROLE_SUCESS:
                draft.list = draft.list.map((acc) =>
                    acc.accountId === payload.userId
                        ? {
                              ...acc,
                              role: ROLES[payload.newRole],
                          }
                        : acc,
                );
                break;
            default:
                break;
        }
    });

export default accountReducer;
