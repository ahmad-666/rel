import { BulkResponse, Bulk } from '@dashboard/types/Bulk';

export const bulkResponseToClient = ({
    id,
    status,
    name,
    file_data,
    rows_count,
    passed,
    creation_date
}: BulkResponse): Bulk => {
    const data: { [key: string]: unknown }[] = [];
    if (file_data) {
        Object.values(file_data).forEach((sheet) => {
            sheet.forEach((row) => {
                data.push(row);
            });
        });
    }

    return {
        id,
        name,
        status,
        data,
        totalRecords: rows_count || 0,
        passedRecords: passed || 0,
        createdAt: creation_date
    };
};
