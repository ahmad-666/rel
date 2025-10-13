import axios, { type AxiosError } from 'axios';
import envs from '@/configs/env';
import { type Response } from '@/types/Common';

const instance = axios.create({
    baseURL: `${envs.frontApiUrl}`
});
// instance.defaults.headers.common['Authorization'] = `Bearer Token`

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
    async (err: AxiosError<Response>) => {
        // response error callback
        return Promise.reject(err);
    }
);

export default instance; //axios instance for our own nextjs api e.g <front-url>/api/...
