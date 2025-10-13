import axios from '@dashboard/libs/axios';
import { bulkResponseToClient } from '@dashboard/utils/transforms/bulk';
import type { Response } from '@/types/Common';
import type {
    AddBulkReqBody,
    BulkResponse,
    GetBulksFilters,
    GetBulksResponse,
    GetBulks,
    Bulk
} from '@dashboard/types/Bulk';

export const addBulks = async ({ name, cells, file }: AddBulkReqBody): Promise<Bulk> => {
    const fd = new FormData();
    fd.set('name', name);
    fd.set('cells', JSON.stringify(cells));
    fd.set('file', file);
    const { data } = await axios.post<Response<BulkResponse>>('/bulks', fd);
    return bulkResponseToClient(data.data);
};
export const getBulk = async ({
    id,
    downloadMode = false
}: {
    id: number;
    /** if set to true, we set x-type:'download' header and server will set bulk status to 'download' without calling 'download' api separately */
    downloadMode?: boolean;
}): Promise<Bulk> => {
    const { data } = await axios.get<Response<{ bulk: BulkResponse }>>(`/bulks/${id}`, {
        headers: {
            'x-type': downloadMode ? 'download' : undefined
        }
    });
    return bulkResponseToClient(data.data.bulk);
};
export const downloadBulk = async (id: number): Promise<null> => {
    await axios.get<Response>(`/bulks/${id}/download`);
    return null;
};
export const deleteBulk = async (id: number): Promise<null> => {
    await axios.delete<Response<BulkResponse>>(`/bulks/${id}`);
    return null;
};
export const getBulks = async ({ query, page = 1, page_size = 10 }: GetBulksFilters): Promise<GetBulks> => {
    const { data } = await axios.get<Response<GetBulksResponse>>('/bulks', {
        params: {
            query: query || undefined,
            page: page - 1,
            page_size
        }
    });
    return {
        items: data.data.bulks.map((bulk) => bulkResponseToClient(bulk)),
        totalCount: data.data.total_count
    };
};
