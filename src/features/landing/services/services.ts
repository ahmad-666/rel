import landingPublicAxios from '@landing/libs/axios';
import { type Response } from '@/types/Common';
import type { EmailLookup } from '@landing/types/service';

//* Get Email Lookup
export const getEmailLookup = async ({ email }: { email: string }): Promise<EmailLookup> => {
    const { data } = await landingPublicAxios.get<Response<EmailLookup>>('public/services/email_lookup', {
        params: {
            email: email
        }
    });
    return {
        exists: data.data.exists,
        person: {
            ...data.data.person
        }
    };
};
