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
    BLOG_DETAIL_CLEAR,
    BLOG_LIKE_ITEM_SUCCESS,
    BLOG_DISLIKE_ITEM_SUCCESS,
    BLOG_LIKE_ITEM_DETAIL_SUCCESS,
    BLOG_DISLIKE_ITEM_DETAIL_SUCCESS,
    BLOG_CLEAR_LIST_PENDING,
    BLOG_REMOVE_ITEM_FROM_LIST_PENDING,
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
            case BLOG_DETAIL_CLEAR:
                draft.blogDetail = {
                    dataResponse: {},
                    isLoading: false,
                    error: null,
                    comments: {
                        dataResponse: [],
                        extraListInfo: {
                            pageIndex: 1,
                            numOfPages: 0,
                        },
                    },
                };
                break;
            case BLOG_LIKE_ITEM_DETAIL_SUCCESS:
                draft.blogDetail.dataResponse.totalLike++;
                draft.blogDetail.dataResponse.totalDisLike--;
                break;
            case BLOG_DISLIKE_ITEM_DETAIL_SUCCESS:
                draft.blogDetail.dataResponse.totalLike--;
                draft.blogDetail.dataResponse.totalDisLike++;
                break;
            case BLOG_LIKE_ITEM_SUCCESS:
                const idxLike = draft.list.findIndex((item) => item.blogID === payload);
                if (idxLike > -1) {
                    draft.list[idxLike].totalLike++;
                    draft.list[idxLike].totalDisLike--;
                }
                break;
            case BLOG_DISLIKE_ITEM_SUCCESS:
                const idxDislike = draft.list.findIndex((item) => item.blogID === payload);
                if (idxDislike > -1) {
                    draft.list[idxDislike].totalLike--;
                    draft.list[idxDislike].totalDisLike++;
                }
                break;
            case BLOG_CLEAR_LIST_PENDING:
                draft.listPendingBlog = [];
                draft.extraPendingBlogListInfo = {
                    pageIndex: 1,
                    numOfPages: 0,
                };
                break;
            case BLOG_REMOVE_ITEM_FROM_LIST_PENDING:
                draft.listPendingBlog = draft.listPendingBlog.filter((item) => item.blogID !== payload);
                break;
            default:
                break;
        }
    });

export default blogReducer;
