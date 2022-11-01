import axios from 'axios';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

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

export {
    getListRecipeByCategoryRequest,
    getRecipeDetailRequest,
    adminGetRecipeListRequest,
    getListRecipeByNameRequest,
    getListRecipeCategoriesRequest,
    createRecipeRequest,
};
