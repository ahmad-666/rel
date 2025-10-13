import axios, { type AxiosError } from 'axios';
// import store from '@/store';
// import { parseResponseError } from '@/utils/error';
import envs from '@/configs/env';
import { type Response } from '@/types/Common';

const landingPublicAxios = axios.create({
    baseURL: `${envs.apiUrl}/v1`
    // headers:{}, //instance.defaults.headers.common['Authorization']
});

landingPublicAxios.interceptors.request.use(
    async (config) => {
        // before request callback
        return config;
    },
    (err: AxiosError<Response>) => {
        // request error callback
        return Promise.reject(err);
    }
);
landingPublicAxios.interceptors.response.use(
    (response) => {
        // response success callback
        return response;
    },
    (err: AxiosError<Response>) => {
        // response error callback
        // const { response } = err;
        // const errorMsg = response ? parseResponseError(response?.data) : 'Unknown error occurred'; //get final error message
        // store.getState().setSnackbar({ type: 'error', show: true, message: errorMsg }); //show message on global snackbar component with help of zustand
        return Promise.reject(err);
    }
);

export default landingPublicAxios; //axios instance for those routes that we need in landing pages e.g list of plans or public company name to url
