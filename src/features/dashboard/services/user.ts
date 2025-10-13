import { type AxiosResponse } from 'axios';
import axios from '@dashboard/libs/axios';
import { userResponseToClient } from '@auth/utils/transforms';
import { apiRegenerateResponseToClient } from '@dashboard/utils/transforms/user';
import type { Response } from '@/types/Common';
import type { LoginResponse, User } from '@auth/types';
import type { ChangePasswordReqBody, ApiRegenerateResponse, ApiRegenerate } from '@dashboard/types/User';

export const getUserInfo = async (): Promise<User> => {
    const { data, config } = await axios.get<Response<LoginResponse>>('/user');
    const authorizationHeader = config.headers.Authorization as string;
    const token = authorizationHeader?.split('Bearer ')?.[1]; //in get user info server does not return user token we manually get it
    return userResponseToClient({ ...data.data.user, token });
};
export const changePassword = async ({ current_password, new_password }: ChangePasswordReqBody): Promise<null> => {
    await axios.patch<null, AxiosResponse<null>, ChangePasswordReqBody>('/user/change_password', {
        current_password,
        new_password
    });
    return null;
};
export const generateApiKey = async (): Promise<ApiRegenerate> => {
    const { data } = await axios.patch<Response<ApiRegenerateResponse>>('/user/api_key/regenerate');
    return apiRegenerateResponseToClient(data.data);
};
