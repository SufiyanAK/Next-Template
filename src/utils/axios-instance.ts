/***** Axios Configuration File *****/

import API_ENDPOINTS from '@/constants/api-endpoints';
import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import { getCookie } from 'cookies-next';

// ---- Environment Variables ----
// In your .env file, make sure you have:
// AUTH_BACKEND_URL=/api/backend/auth
// SERVICE_BACKEND_URL=/api/backend/service
// or point directly to backend if skipping proxy
const API_BASE_URL = API_ENDPOINTS.backend || '/api/backend';

// ---- Default Axios Options ----
const defaultOptions = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

// ---- Create Axios Instance ----
const axiosInstance: AxiosInstance = axios.create(defaultOptions);

// ---- Request Interceptor ----
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Get token from localStorage (client-side) or cookies (server-side)

        // Server-side: use cookies
        const token = getCookie('RPAAuthToken') as string | undefined;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ---- Response Interceptor ----
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response, // Success → just return response
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            console.log(
                `Axios Error: Status ${status}`,
                error.response.data || error.message
            );
        } else {
            console.log('Network or unexpected error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
