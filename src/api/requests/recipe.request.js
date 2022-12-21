import axios from './axiosInstance';
import { getAccessToken } from '../../utils';
import apiUrl from '../apiUrl';

const token = getAccessToken();

const getTopMonthListRecipeRequest = () => axios.get(apiUrl.TOPMONTH_URL);

const getTopNewListRecipeRequest = () => axios.get(apiUrl.TOPNEW_URL);

const getTopWeekListRecipeRequest = () => axios.get(apiUrl.TOPWEEK_URL);

const getListRecipeByCategoryRequest = (categoryId, page = 1, search = '') =>
    axios.get(`/searchdishbycate?cateId=${categoryId}&page_index=${page}&searchData=${search}`);

const getRecipeDetailRequest = (id) => axios.get(`/getRecipeDetail?dishId=${id}`);

const adminGetRecipeDetailRequest = (id) =>
    axios.get(`/mod/getdishbyid?dish_id=${id}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const adminGetRecipeListRequest = (page = 1, search = '') =>
    axios.get(`/admin/listRecipe?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });
const modeGetRecipeListRequest = (creator, page = 1, search = '') =>
    axios.get(`/mod/listRecipeOfCreater?creater=${creator}&pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getListRecipeByNameRequest = (name, page = 1, search = '') =>
    axios.get(`/searchdishbyname?name=${name}&page_index=${page}&searchData=${search}`);

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

const getRecipeCommentsRequest = (id, page) =>
    axios.get(`/getListCommentOfRecipe?dishId=${id}&pageIndex=${page}`, {
        headers: {
            Authorization: `Bearer ${token || ''}`,
        },
    });

const getRecipeCommentsAuthRequest = (dishId, index) =>
    axios.get(`/getListCommentOfRecipe?dishId=${dishId}&pageIndex=${index}`, {
        headers: {
            Authorization: `Bearer ${token || ''}`,
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
    axios.get(`/admin/getListDishCommentReport?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getFavouriteRecipeListRequest = (page = 1, search = '') =>
    axios.get(`/getFavoriteRecipes?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const approveRecipeCommentRequest = (dishCommentId) =>
    axios.post(`/admin/approveDishComment?dishCommentId=${dishCommentId}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const editRecipeRequest = (id, data) =>
    axios.put(`/mod/editrecipe?recipe_id=${id}`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const deleteCategoryRequest = (id) =>
    axios.post(`/admin/deleteCategory?categoryId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const addRecipeToFavouriteList = (id) =>
    axios.post(`/addFavoriteRecipes?dishId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const removeRecipeFromFavouriteList = (id) =>
    axios.post(`/removeFavoriteRecipes?dishId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const createCategoryRequest = (data) =>
    axios.post(`/admin/saveCategory`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getListIngReportRequest = (page, search) =>
    axios.get(`/getListIngredientConflict?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });
const createIngredientReportRequest = (data) =>
    axios.post(`/saveIngredientConflict`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const removeIngredientReportRequest = (id) =>
    axios.post(`/deleteIngredientConflict?ingredientConflictId=${id}`, null, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const adminGetRecipeListByCategoryRequest = (categoryId, page = 1, search = '') =>
    axios.get(`/admin/listRecipeByCategory?categoryId=${categoryId}&pageIndex=${page}&searchData=${search}`, {
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
    getFavouriteRecipeListRequest,
    approveRecipeCommentRequest,
    editRecipeRequest,
    deleteCategoryRequest,
    modeGetRecipeListRequest,
    addRecipeToFavouriteList,
    removeRecipeFromFavouriteList,
    createCategoryRequest,
    adminGetRecipeDetailRequest,
    getListIngReportRequest,
    createIngredientReportRequest,
    removeIngredientReportRequest,
    adminGetRecipeListByCategoryRequest,
};
