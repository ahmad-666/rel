import { type EmailLookup } from '@landing/types/service';

export type EmailLookupSocialMedia = Record<string, { icon: string; get: (data: EmailLookup) => string | null }>;

export type EmailLookupInfo = Record<
    string,
    { title: string; get: (data: EmailLookup) => string | string[] | null | undefined }
>;
