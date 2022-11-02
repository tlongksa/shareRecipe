import axios from 'axios';
import { getAccessToken } from '../../utils';

const token = getAccessToken();

const getUserBmiInfoRequest = (name = '') =>
    axios.get(`/getInformationBMIUser/${name}`, {
        headers: {
            authorization: `Bearer ${token || ''}`,
        },
    });

export { getUserBmiInfoRequest };
