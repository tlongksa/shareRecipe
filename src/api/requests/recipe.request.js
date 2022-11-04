import axios from './axiosInstance';
import { getAccessToken } from '../../utils';
import apiUrl from '../apiUrl';

const token = getAccessToken();

const getTopMonthListRecipeRequest = () => axios.get(apiUrl.TOPMONTH_URL);

const getTopNewListRecipeRequest = () => axios.get(apiUrl.TOPNEW_URL);

const getTopWeekListRecipeRequest = () => axios.get(apiUrl.TOPWEEK_URL);

const getListRecipeByCategoryRequest = (categoryId, page = 1, search = '') =>
    axios.get(`/searchdishbycate?cateId=${categoryId}&pageIndex=${page}&searchData=${search}`);

const getRecipeDetailRequest = (id) => axios.get(`/getRecipeDetail?dishId=${id}`);

const adminGetRecipeListRequest = (page = 1, search = '') =>
    axios.get(`/admin/listRecipe?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getListRecipeByNameRequest = (name, page = 1, search = '') =>
    axios.get(`/searchdishbyname?name=${name}&pageIndex=${page}&searchData=${search}`);

const getListRecipeCategoriesRequest = () => axios.get('/getCategories');

const createRecipeRequest = (data) =>
    axios.post(`/mod/createrecipe`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteRecipeRequest = (id) =>
    axios.delete(`/mod/deleterecipe?recipe_id=${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getRecipeIngredientChangeRequest = (ids) => axios.get(`/getIngredientChange?ingredientDetailId=${ids}`);

const getRecipeCommentsRequest = (id) => axios.get(`/getListCommentOfRecipe?dishId=${id}`);

const getRecipeCommentsAuthRequest = (dishId, index) =>
    axios.get(`/getListCommentOfRecipe?dishId=${dishId}&pageIndex=${index}`, {
        headers: {
            Authorization: token,
        },
    });

const createRecipeCommentRequest = (data) =>
    axios.post(`/saveDishComment`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const likeRecipeCommentRequest = (dishCommentId, data) =>
    axios.post(`/likeDishComment?dishCommentId=${dishCommentId}`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const dislikeRecipeCommentRequest = (dishCommentId, data) =>
    axios.post(`/dislikeDishComment?dishCommentId=${dishCommentId}`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const reportRecipeCommentRequest = (dishCommentId, data) =>
    axios.post(`/reportDishComment?dishCommentId=${dishCommentId}`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteRecipeCommentRequest = (dishCommentId) =>
    axios.post(`/deleteDishComment?dishCommentId=${dishCommentId}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getListReportRecipeCommentRequest = (page, search) =>
    axios.get(`/reportDishComment??pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

export {
    getListRecipeByCategoryRequest,
    getRecipeDetailRequest,
    adminGetRecipeListRequest,
    getListRecipeByNameRequest,
    getListRecipeCategoriesRequest,
    createRecipeRequest,
    deleteRecipeRequest,
    getTopMonthListRecipeRequest,
    getTopNewListRecipeRequest,
    getTopWeekListRecipeRequest,
    getRecipeIngredientChangeRequest,
    getRecipeCommentsRequest,
    getRecipeCommentsAuthRequest,
    createRecipeCommentRequest,
    likeRecipeCommentRequest,
    dislikeRecipeCommentRequest,
    reportRecipeCommentRequest,
    deleteRecipeCommentRequest,
    getListReportRecipeCommentRequest,
};
