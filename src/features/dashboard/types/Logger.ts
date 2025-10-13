export type LoggerParams = {
    event: string;
    meta_data?: Record<string, unknown>;
};
export type LoggerReqBody = {
    event: string;
    meta_data?: string;
};
