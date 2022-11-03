import axios from 'axios';

export const HEADER_AUTH_KEY = 'authorization';

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_REST_API_URL_PROD
            : process.env.REACT_APP_REST_API_URL,
    timeout: 20000, // 20 seconds
});

export default axiosInstance;
