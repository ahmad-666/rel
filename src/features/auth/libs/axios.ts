import axios, { type AxiosError } from 'axios';
import store from '@/store';
import { parseResponseError } from '@/utils/error';
import envs from '@/configs/env';
import { type Response } from '@/types/Common';

const instance = axios.create({
    baseURL: `${envs.apiUrl}/v1`
});

instance.interceptors.request.use(
    async (config) => {
        // before request callback
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
        const { response } = err;
        const errorMsg = response ? parseResponseError(response?.data) : 'Unknown error occurred'; //get final error message
        if (!isServer) {
            store.getState().setSnackbar({ type: 'error', show: true, message: errorMsg }); //show message on global snackbar component with help of zustand
        }
        return Promise.reject(err);
    }
);

export default instance; //axios instance for auth routes e.g login,logout,forget password,...
