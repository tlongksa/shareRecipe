import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_GET_PROFILE,
    AUTH_GET_PROFILE_SUCCESS,
    AUTH_GET_PROFILE_FAILURE,
    AUTH_UPDATE_PROFILE_SUCCESS,
    AUTH_UPDATE_PROFILE_IMAGE_URL,
} from './types';
import produce from 'immer';
import { defaultValues } from '.';
import { USER_INFO_STORAGE_KEY } from '../../constants';

const authReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case AUTH_SUCCESS:
                draft.userInfo = payload;
                break;
            case AUTH_LOGOUT:
                draft.userInfo = { avatarImage: '', roles: '', username: '', accessToken: '', id: 0 };
                break;
            case AUTH_GET_PROFILE:
                draft.profile.isLoading = true;
                draft.profile.error = null;
                break;
            case AUTH_GET_PROFILE_SUCCESS:
                draft.profile.dataResponse = payload;
                draft.profile.error = null;
                draft.profile.isLoading = false;
                break;
            case AUTH_GET_PROFILE_FAILURE:
                draft.profile.error = payload;
                draft.profile.isLoading = false;
                break;
            case AUTH_UPDATE_PROFILE_SUCCESS:
                draft.profile.dataResponse.high = payload.high;
                draft.profile.dataResponse.weight = payload.weight;
                draft.profile.dataResponse.dob = payload.dob;
                draft.profile.dataResponse.gender = payload.gender;
                draft.profile.dataResponse.phone = payload.phone;
                draft.profile.dataResponse.address = payload.address;
                break;
            case AUTH_UPDATE_PROFILE_IMAGE_URL:
                draft.userInfo.avatarImage = payload;
                localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(draft.userInfo));
                break;
            default:
                break;
        }
    });

export default authReducer;
