import { USER_INFO_STORAGE_KEY } from '../constants';

export const getAccessToken = () => {
    const userInfoFromStorage = localStorage.getItem(USER_INFO_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(USER_INFO_STORAGE_KEY))
        : null;
    if (!userInfoFromStorage) return '';
    return userInfoFromStorage.accessToken;
};
