export enum Status {
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    DOWNLOADED = 'downloaded',
    FAILED = 'failed'
}
export type Bulk = {
    id: number;
    status: Status;
    name: string;
    /** total records inside bulk file */
    totalRecords: number;
    /** how many records we could enrich */
    passedRecords: number;
    data: { [key: string]: unknown }[];
    createdAt: string;
};
export type AddBulkReqBody = {
    name: string;
    cells: unknown[];
    file: File;
};
export type BulkResponse = {
    id: number;
    status: Status;
    name: string;
    rows_count: number;
    passed: number;
    file_data?: { [key: string]: { [key: string]: unknown }[] };
    creation_date: string;
};
export type GetBulksFilters = {
    query?: string;
    page?: number;
    page_size?: number;
};
export type GetBulks = {
    items: Bulk[];
    totalCount: number;
};
export type GetBulksResponse = {
    bulks: BulkResponse[];
    total_count: number;
};
