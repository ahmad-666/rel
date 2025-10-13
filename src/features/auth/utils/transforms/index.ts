import type { UserResponse, User } from '@auth/types';

export const userResponseToClient = ({
    name,
    email,
    is_verified,
    credits,
    signup_date,
    api_key,
    api_key_last_update,
    token
}: UserResponse): User => {
    return {
        name,
        email,
        isVerified: is_verified,
        credits,
        activePlan: null,
        imgSrc: '',
        registerDate: signup_date,
        apiKey: api_key,
        apiKeyLastUpdate: api_key_last_update,
        token
    };
};
