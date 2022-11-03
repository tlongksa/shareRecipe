import axios from 'axios';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

const getUserBmiInfoRequest = (name = '') =>
    axios.get(`/getInformationBMIUser/${name}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

const getUserBmiRecipeListRequest = (totalCalo, meal, mainIngredient) =>
    axios.get(
        `/getDishByBMIUser?${meal ? `meal=${meal}&` : ''}${
            mainIngredient ? `mainIngredient=${mainIngredient}&` : ''
        }totalCalo=${totalCalo}`,
        {
            headers: {
                authorization: `Bearer ${token || ''}`,
            },
        },
    );

const getMainIngredientListRequest = () =>
    axios.get(`/getMainIngredient`, {
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
export { getUserBmiInfoRequest, getUserBmiRecipeListRequest, getMainIngredientListRequest, updateUserBmiInfoRequest };
