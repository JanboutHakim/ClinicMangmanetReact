// src/services/api.ts
import axios from 'axios';
import { BASE_URL } from '../constants/apiConfig';

const api = axios.create({
    baseURL: BASE_URL,
});

export const refreshAccessToken = async (refreshToken: string) => {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
    return response.data.accessToken;
};

export const setupInterceptors = (
    accessToken: string,
    refreshToken: string,
    login: Function,
    logout: Function
) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    api.interceptors.response.use(
        (res) => res,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
                originalRequest._retry = true;
                try {
                    const newToken = await refreshAccessToken(refreshToken);
                    login({ accessToken: newToken, refreshToken, user: JSON.parse(localStorage.getItem('user')!) });
                    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return api(originalRequest);
                } catch {
                    logout();
                }
            }
            return Promise.reject(error);
        }
    );
};

export default api;
