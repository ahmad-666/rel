import { type AxiosResponse } from 'axios';
import axios from '@dashboard/libs/axios';
import type { Response } from '@/types/Common';
import type { LoggerParams, LoggerReqBody } from '@dashboard/types/Logger';

export const sendLog = async ({ event, meta_data }: LoggerParams): Promise<null> => {
    await axios.post<Response, AxiosResponse<Response>, LoggerReqBody>('/user/activity', {
        event,
        meta_data: Object.keys(meta_data || {}).length ? JSON.stringify(meta_data) : undefined
    });
    return null;
};
