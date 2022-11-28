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
    BLOG_GET_COMMENT_REPORT_LIST,
    BLOG_GET_COMMENT_REPORT_LIST_SUCCESS,
    BLOG_GET_COMMENT_REPORT_LIST_FAILURE,
    BLOG_UPDATE_COMMENT_CONTENT,
    BLOG_REMOVE_COMMENT_REPORT_FROM_LIST,
    BLOG_INCREASE_NUM_OF_COMMENTS,
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
                draft.list = payload?.data;
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
                draft.blogDetail.comments.dataResponse = payload?.data || [];
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
                draft.listPendingBlog = payload?.data;
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
                break;
            case BLOG_DISLIKE_ITEM_DETAIL_SUCCESS:
                draft.blogDetail.dataResponse.totalDisLike++;
                break;
            case BLOG_LIKE_ITEM_SUCCESS:
                const idxLike = draft.list.findIndex((item) => item.blogID === payload);
                if (idxLike > -1) {
                    draft.list[idxLike].totalLike++;
                }
                break;
            case BLOG_DISLIKE_ITEM_SUCCESS:
                const idxDislike = draft.list.findIndex((item) => item.blogID === payload);
                if (idxDislike > -1) {
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
            case BLOG_GET_COMMENT_REPORT_LIST:
                draft.blogCommentReport.isLoading = true;
                draft.blogCommentReport.error = null;
                break;
            case BLOG_GET_COMMENT_REPORT_LIST_SUCCESS:
                draft.blogCommentReport.isLoading = false;
                draft.blogCommentReport.list = payload?.data || [];
                draft.blogCommentReport.extraListInfo = payload.extraListInfo;
                break;
            case BLOG_GET_COMMENT_REPORT_LIST_FAILURE:
                draft.blogCommentReport.isLoading = false;
                draft.blogCommentReport.error = payload;
                break;
            case BLOG_UPDATE_COMMENT_CONTENT:
                const blogCmtIdx = draft.blogDetail.comments.dataResponse.findIndex(
                    (it) => it.blogCommentID === payload.blogCommentId,
                );
                if (blogCmtIdx >= 0) {
                    draft.blogDetail.comments.dataResponse[blogCmtIdx].content = payload.content;
                }
                break;
            case BLOG_REMOVE_COMMENT_REPORT_FROM_LIST:
                draft.blogCommentReport.list = draft.blogCommentReport.list.filter(
                    (item) => item.blogCommentID !== payload,
                );
                break;
            case BLOG_INCREASE_NUM_OF_COMMENTS:
                draft.blogDetail.dataResponse.numberComment++;
                break;
            default:
                break;
        }
    });

export default blogReducer;
