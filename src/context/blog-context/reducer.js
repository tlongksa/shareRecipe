import {
    BLOG_GET_LIST,
    BLOG_GET_LIST_FAILURE,
    BLOG_GET_LIST_SUCCESS,
    BLOG_CLEAR_LIST,
    BLOG_GET_DETAIL,
    BLOG_GET_DETAIL_FAILURE,
    BLOG_GET_DETAIL_SUCCESS,
    BLOG_GET_COMMENTS,
    BLOG_GET_COMMENTS_SUCCESS,
    BLOG_GET_COMMENTS_FAILURE,
    BLOG_GET_LIST_PENDING,
    BLOG_GET_LIST_PENDING_FAILURE,
    BLOG_GET_LIST_PENDING_SUCCESS,
} from './types';
import produce from 'immer';
import { defaultValues } from '.';

const blogReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case BLOG_GET_LIST:
                draft.isLoading = true;
                draft.error = null;
                break;
            case BLOG_GET_LIST_SUCCESS:
                draft.isLoading = false;
                if (draft.extraListInfo.numOfPages === 0) {
                    draft.list = payload?.data;
                } else {
                    draft.list = draft.list.concat(payload?.data);
                }
                draft.extraListInfo = payload.extraListInfo;
                break;
            case BLOG_GET_LIST_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            case BLOG_CLEAR_LIST:
                draft.list = [];
                draft.extraListInfo = {
                    pageIndex: 1,
                    numOfPages: 0,
                };
                break;
            case BLOG_GET_DETAIL:
                draft.blogDetail.isLoading = true;
                draft.blogDetail.error = null;
                break;
            case BLOG_GET_DETAIL_SUCCESS:
                draft.blogDetail.dataResponse = payload;
                draft.blogDetail.error = null;
                draft.blogDetail.isLoading = false;
                break;
            case BLOG_GET_DETAIL_FAILURE:
                draft.blogDetail.error = payload;
                draft.blogDetail.isLoading = false;
                break;
            case BLOG_GET_COMMENTS:
                draft.blogDetail.isLoading = true;
                draft.blogDetail.error = null;
                break;
            case BLOG_GET_COMMENTS_SUCCESS:
                draft.blogDetail.error = null;
                draft.blogDetail.isLoading = false;
                if (draft.blogDetail.comments.extraListInfo.numOfPages === 0) {
                    draft.blogDetail.comments.dataResponse = payload?.data || [];
                } else {
                    draft.blogDetail.comments.dataResponse = draft.blogDetail.comments.dataResponse.concat(
                        payload?.data || [],
                    );
                }
                draft.blogDetail.comments.extraListInfo = payload.extraListInfo;
                break;
            case BLOG_GET_COMMENTS_FAILURE:
                draft.blogDetail.error = payload;
                draft.blogDetail.isLoading = false;
                break;
            case BLOG_GET_LIST_PENDING:
                draft.isLoading = true;
                draft.error = null;
                break;
            case BLOG_GET_LIST_PENDING_SUCCESS:
                draft.isLoading = false;
                if (draft.extraPendingBlogListInfo.numOfPages === 0) {
                    draft.listPendingBlog = payload?.data;
                } else {
                    draft.listPendingBlog = draft.listPendingBlog.concat(payload?.data);
                }
                draft.extraPendingBlogListInfo = payload.extraListInfo;
                break;
            case BLOG_GET_LIST_PENDING_FAILURE:
                draft.isLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    });

export default blogReducer;
