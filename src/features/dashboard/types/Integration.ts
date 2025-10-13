export enum Type {
    AUTOMATION,
    CRM
}
export enum Status {
    CONNECT,
    DISCONNECT,
    COMING_SOON
}
export enum Company {
    ZAPIER = 'zapier',
    SALESFORCE = 'salesforce',
    ZOHO = 'zoho',
    HUBSPOT = 'hubspot'
}
export type Integration = {
    type: Type;
    company: Company;
    status?: Status;
    title: string;
    description?: string;
    fillImgSrc: string;
    transparentImgSrc: string;
};
export type IntegrationsListResponse = {
    zapier: boolean;
    zoho: boolean;
    hubspot: boolean;
    salesforce: boolean;
};
export type ConnectReqBody = {
    code: string;
};
export type PushToCRMBody = {
    bulk_id: number;
    company: Company;
};
