import type { ApiRegenerateResponse, ApiRegenerate } from '@dashboard/types/User';

export const apiRegenerateResponseToClient = ({
    api_key,
    api_key_last_update
}: ApiRegenerateResponse): ApiRegenerate => {
    return {
        apiKey: api_key,
        apiKeyLastUpdate: api_key_last_update
    };
};
