import { BLOG_GET_LIST, BLOG_GET_LIST_FAILURE, BLOG_GET_LIST_SUCCESS } from './types';
import produce from 'immer';
import { defaultValues } from '.';

const MAX_ITEMS_PER_PAGE = 5;

const blogReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case BLOG_GET_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case BLOG_GET_LIST_SUCCESS:
                draft.isLoading = false;
                if (draft.extraListInfo.last_page === 0) {
                    draft.currentNumOfNewNoti = 0;
                    draft.list = payload?.data;
                } else {
                    draft.list = draft.list.concat(payload?.data?.slice(draft.currentNumOfNewNoti, MAX_ITEMS_PER_PAGE));
                }
                draft.extraListInfo = payload.extraListInfo;
                draft.currentNewNoti = undefined;
                break;
            case BLOG_GET_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    });

export default blogReducer;
