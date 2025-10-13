import { type AxiosResponse } from 'axios';
import axios from '@dashboard/libs/axios';
import { type Response } from '@/types/Common';
import {
    Company,
    type IntegrationsListResponse,
    type ConnectReqBody,
    type PushToCRMBody
} from '@dashboard/types/Integration';

export const getLists = async () => {
    const { data } = await axios.get<Response<IntegrationsListResponse>>('/integrations');
    return data.data;
};
export const connectTo = async ({ company, code }: ConnectReqBody & { company: Company }) => {
    await axios.post<unknown, AxiosResponse<unknown>, ConnectReqBody>(`/integrations/${company}/connect`, { code });
};
export const disconnectFrom = async ({ company }: { company: Company }) => {
    await axios.delete(`/integrations/${company}/disconnect`);
};
export const pushToCRM = async ({ bulk_id, company }: PushToCRMBody) => {
    await axios.post<unknown, AxiosResponse<unknown>, Pick<PushToCRMBody, 'bulk_id'>>(`/integrations/${company}/push`, {
        bulk_id
    });
    return null;
};
