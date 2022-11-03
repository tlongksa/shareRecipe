import { ROLES } from '../App';
export const role_options = ['admin', 'user', 'mod'];

export const mapRoleKeyToText = (role) => {
    if (role === ROLES.admin) {
        return 'admin';
    }
    if (role === ROLES.mod) {
        return 'mod';
    }
    if (role === ROLES.user) {
        return 'user';
    }
    return 'user';
};
