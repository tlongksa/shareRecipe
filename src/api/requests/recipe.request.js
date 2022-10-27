import axios from 'axios';

const token = localStorage.getItem('token');

const getListRecipeByCategoryRequest = (categoryId, page = 1, search = '') =>
    axios.get(`/searchdishbycate/${categoryId}?pageIndex=${page}&searchData=${search}`);

const getRecipeDetailRequest = (id) => axios.get(`/getRecipeDetail?dishId=${id}`);

const adminGetRecipeListRequest = (page = 1, search = '') =>
    axios.get(`/admin/listRecipe?pageIndex=${page}&searchData=${search}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

export { getListRecipeByCategoryRequest, getRecipeDetailRequest, adminGetRecipeListRequest };
