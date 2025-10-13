export type Option = {
    value: number | string;
    label: string;
    [key: string]: unknown;
};
export type PasswordCheck = {
    /** label of this validation that explains that value should be */
    label: string;
    /** validator error message that we show if value not pass a test */
    message: string;
    /** validator function that return boolean base on passed value */
    validator: (val: string) => boolean;
};
export type Status = -1 | 1; //-1 means error ... 1 means success
export type Response<T extends object = Record<string, unknown>> = {
    status: Status;
    code: number;
    message?: string;
    errors?: { [key: string]: string };
    data: T;
};
