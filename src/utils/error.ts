import responseCodes from '@/data/response-codes';
import { type Response } from '@/types/Common';
import { ResponseCodes } from '@/types/ResponseCode';

export const parseResponseError = (res: Response) => {
    const { code, errors, message } = res;
    const resCodeMsg = responseCodes.get(code as ResponseCodes);
    const resErrors = Object.values(errors || {});
    return resCodeMsg || resErrors[0] || (message as string);
};
