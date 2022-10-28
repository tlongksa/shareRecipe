import axios from 'axios';

const token = localStorage.getItem('token');

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

export {
    getListRecipeByCategoryRequest,
    getRecipeDetailRequest,
    adminGetRecipeListRequest,
    getListRecipeByNameRequest,
};
