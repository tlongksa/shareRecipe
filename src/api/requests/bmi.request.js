import axios from './axiosInstance';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

const getUserBmiInfoRequest = (name = '') =>
    axios.get(`/getInformationBMIUser/${name}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getUserBmiRecipeListRequest = (totalCalo) =>
    axios.get(`/getListDishByBMIUser?totalCalo=${totalCalo}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getUserBmiRecipeByFavouriteRequest = (totalCalo, meal, mainIngredient) =>
    axios.get(`/getDishByBMIUser?meal=${meal}&mainIngredient=${mainIngredient}&totalCalo=${totalCalo}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getBmiRecipesByCaloRequest = (totalCalo, meal, mainIngredient) =>
    axios.get(`/getDishByCaloBMI?meal=${meal}&mainIngredient=${mainIngredient}&calo=${totalCalo}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getUserBmiAlternativeListRecipeRequest = (totalCalo, meal, mainIngredient) =>
    axios.get(`/searchDishByCaloBMI?meal=${meal}&mainIngredient=${mainIngredient}&calo=${totalCalo}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getMainIngredientListRequest = () =>
    axios.get(`/getMainIngredient`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const searchMainIngredientListRequest = (ingredient) =>
    axios.get(`/searchMainIngredient?ingredient=${ingredient}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const updateUserBmiInfoRequest = (data) =>
    axios.put(`/UpdateProfileBMI`, data, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getUserBmiListRequest = () => axios.get(`/getInformationBMIUser/`);

export {
    getUserBmiInfoRequest,
    getUserBmiRecipeListRequest,
    getMainIngredientListRequest,
    updateUserBmiInfoRequest,
    getUserBmiRecipeByFavouriteRequest,
    getUserBmiListRequest,
    searchMainIngredientListRequest,
    getUserBmiAlternativeListRecipeRequest,
    getBmiRecipesByCaloRequest,
};
