import { type UserPlan } from '@dashboard/types/Plan';

export type User = {
    isVerified: boolean;
    name: string;
    email: string;
    imgSrc?: string;
    credits?: number;
    activePlan?: null | UserPlan;
    registerDate: string;
    apiKey: string;
    apiKeyLastUpdate?: string;
    token: string;
};
export type SignupReqBody = {
    full_name: string;
    email: string;
    password: string;
    /** captcha token */
    captchaToken?: string;
    /** client url queries */
    analytics?: Record<string, unknown>;
};
export type SignupConfirmReqBody = {
    email: string;
    code: string;
    /** captcha token */
    captchaToken?: string;
};
export type LoginReqBody = {
    email: string;
    password: string;
    /** captcha token */
    captchaToken?: string;
    /** client url queries */
    analytics?: Record<string, unknown>;
};
export type UserResponse = {
    name: string;
    email: string;
    is_verified: boolean;
    credits: number;
    token: string;
    signup_date: string;
    api_key: string;
    api_key_last_update: string;
};
export type LoginResponse = {
    user: UserResponse;
};
export type ForgetPasswordReqBody = {
    email: string;
    captchaToken?: string;
};
export type ResetPasswordReqBody = {
    email: string;
    code: string;
    new_password: string;
    /** captcha token */
    captchaToken?: string;
};
export type GoogleOAuthReqBody = {
    /** google oauth token */
    access_token: string;
    /** captcha token */
    captchaToken?: string;
    /** client url queries */
    analytics?: Record<string, unknown>;
};
