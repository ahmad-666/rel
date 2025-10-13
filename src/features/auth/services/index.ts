import { type AxiosResponse } from 'axios';
import axios from '@auth/libs/axios';
import { userResponseToClient } from '@auth/utils/transforms';
import type { Response } from '@/types/Common';
import type {
    SignupReqBody,
    SignupConfirmReqBody,
    LoginReqBody,
    ForgetPasswordReqBody,
    ResetPasswordReqBody,
    LoginResponse,
    User,
    GoogleOAuthReqBody
} from '@auth/types';

export const signup = async ({ full_name, email, password, captchaToken, analytics }: SignupReqBody): Promise<null> => {
    await axios.post<Response, AxiosResponse<Response>, SignupReqBody>(
        '/auth/signup',
        {
            email,
            full_name,
            password,
            analytics
        },
        {
            headers: {
                'x-captcha-token': captchaToken
            }
        }
    );
    return null;
};
export const signupConfirm = async ({ email, code, captchaToken }: SignupConfirmReqBody): Promise<User> => {
    const { data } = await axios.patch<
        Response<LoginResponse>,
        AxiosResponse<Response<LoginResponse>>,
        SignupConfirmReqBody
    >(
        '/auth/signup_confirm',
        {
            email,
            code
        },
        {
            headers: {
                'x-captcha-token': captchaToken
            }
        }
    );
    return userResponseToClient(data.data.user);
};
export const login = async ({ email, password, captchaToken, analytics }: LoginReqBody): Promise<User> => {
    const { data } = await axios.post<Response<LoginResponse>, AxiosResponse<Response<LoginResponse>>, LoginReqBody>(
        '/auth/signin',
        {
            email,
            password,
            analytics
        },
        {
            headers: {
                'x-captcha-token': captchaToken
            }
        }
    );
    return userResponseToClient(data.data.user);
};
export const forgetPassword = async ({ email, captchaToken }: ForgetPasswordReqBody): Promise<null> => {
    await axios.post<Response, AxiosResponse<Response>, ForgetPasswordReqBody>(
        '/auth/forgot_password',
        {
            email
        },
        {
            headers: {
                'x-captcha-token': captchaToken
            }
        }
    );
    return null;
};
export const resetPassword = async ({
    email,
    code,
    new_password,
    captchaToken
}: ResetPasswordReqBody): Promise<null> => {
    await axios.post<Response, AxiosResponse<Response>, ResetPasswordReqBody>(
        '/auth/reset_password',
        {
            email,
            code,
            new_password
        },
        {
            headers: {
                'x-captcha-token': captchaToken
            }
        }
    );
    return null;
};
export const googleOAuth = async ({ access_token, analytics, captchaToken }: GoogleOAuthReqBody): Promise<User> => {
    const { data } = await axios.post<
        Response<LoginResponse>,
        AxiosResponse<Response<LoginResponse>>,
        GoogleOAuthReqBody
    >(
        '/auth/google/oauth',
        {
            access_token,
            analytics
        },
        {
            headers: {
                'x-captcha-token': captchaToken
            }
        }
    );
    return userResponseToClient(data.data.user);
};
