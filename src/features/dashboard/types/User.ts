import type { User, UserResponse } from '@auth/types';

export type ChangePasswordReqBody = {
    current_password: string;
    new_password: string;
};
export type ApiRegenerate = Pick<User, 'apiKey' | 'apiKeyLastUpdate'>;
export type ApiRegenerateResponse = Pick<UserResponse, 'api_key' | 'api_key_last_update'>;
