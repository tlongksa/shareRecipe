import { AUTH_SUCCESS, AUTH_LOGOUT } from './types';
import produce from 'immer';
import { defaultValues } from '.';

const authReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case AUTH_SUCCESS:
                draft.userInfo = payload;
                break;
            case AUTH_LOGOUT:
                draft.userInfo = { avatarImage: '', roles: '', username: '', accessToken: '', id: 0 };
                break;

            default:
                break;
        }
    });

export default authReducer;
