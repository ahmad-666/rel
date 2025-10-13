import { type AxiosResponse } from 'axios';
import axios from '@dashboard/libs/axios';
import { emailLookupResponseToClient } from '@dashboard/utils/transforms/email-lookup';
import type { Response } from '@/types/Common';
import type { EmailLookupReqBody, EmailLookupResponse, EmailLookup } from '@dashboard/types/Email-Lookup';
import { CreditUsageType } from '@dashboard/types/Plan';

export const getEmailLookups = async ({ email, apiKey }: EmailLookupReqBody): Promise<EmailLookup> => {
    const { data } = await axios.post<
        Response<EmailLookupResponse>,
        AxiosResponse<Response<EmailLookupResponse>>,
        EmailLookupReqBody
    >(
        '/services/email_lookup',
        { email },
        {
            headers: {
                'x-consumer': CreditUsageType.DASHBOARD,
                'x-api-key': apiKey
            }
        }
    );
    return emailLookupResponseToClient(data.data);
};
