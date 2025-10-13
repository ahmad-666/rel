import axios, { type AxiosError } from 'axios';
import store from '@/store';
import { parseResponseError } from '@/utils/error';
import getToken from '@auth/utils/get-token';
import envs from '@/configs/env';
import { type Response } from '@/types/Common';

const instance = axios.create({
    baseURL: `${envs.apiUrl}/v1`
});

instance.interceptors.request.use(
    async (config) => {
        // before request callback
        const token = await getToken(); //get jwt token on both server/client
        if (token) config.headers.Authorization = `Bearer ${token}`; //if we have token then we add it to Authorization header
        return config;
    },
    (err: AxiosError<Response>) => {
        // request error callback
        return Promise.reject(err);
    }
);
instance.interceptors.response.use(
    (response) => {
        // response success callback
        return response;
    },
    (err: AxiosError<Response>) => {
        // response error callback
        const isServer = typeof window === 'undefined';
        const { status: httpCode, response } = err;
        const errorMsg = response ? parseResponseError(response?.data) : 'Unknown error occurred'; //get final error message
        if (!isServer) {
            // inside root layout we send client side req to get latest data of logged in user and if we succeed then we store those data in global store and update cookie else we logout user and redirect to login page(check /src/app/layout) ... so initial auth checker is client-side and we don't face any conflicts
            const isDashboardRoute = window.location.href.includes('/dashboard'); //for better user experience we only want to show snackbar error and redirect to login page only if user is inside any of dashboard pages
            if (isDashboardRoute) store.getState().setSnackbar({ type: 'error', show: true, message: errorMsg }); //show message on global snackbar component with help of zustand
            if (httpCode === 401 || httpCode === 403) {
                // if we get 401,403 error we logout and redirect to login page
                store.getState().logout();
                if (isDashboardRoute) window.location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
);

export default instance; //axios instance for dashboard routes e.g get user info,name to domain service,bulks,...
