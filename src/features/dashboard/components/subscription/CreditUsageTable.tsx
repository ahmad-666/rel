'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GridColDef } from '@mui/x-data-grid-pro';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import DataTable from '@/components/DataTable/Mui';
import useSnackbar from '@/hooks/useSnackbar';
import dayjs from '@/libs/dayjs';
import { getCreditUsage } from '@dashboard/services/plan';
import { generateExcel, downloadFile } from '@/utils/file';
import { type CreditHistory } from '@dashboard/types/Plan';

type Props = BoxProps & {
    pageSize?: number;
    totalCount?: number;
    items: CreditHistory[];
};

const intl = new Intl.NumberFormat('en-US');

export default function CreditUsageTable({ pageSize = 10, totalCount = 0, items = [], ...rest }: Props) {
    const { setSnackbar } = useSnackbar();
    const [pagination, setPagination] = useState({ page: 1, pageSize });
    const columns = useMemo<GridColDef<CreditHistory>[]>(() => {
        return [
            {
                field: 'type',
                headerName: 'Type',
                width: 150,
                cellClassName: 'cell-type'
            },
            {
                field: 'query',
                headerName: 'Query',
                width: 350
            },
            {
                field: 'value',
                headerName: 'Cost',
                width: 150,
                valueFormatter: (val) => `${intl.format(val)} credit${val > 1 ? 's' : ''}`
            },
            {
                field: 'date',
                headerName: 'Created',
                minWidth: 150,
                flex: 1,
                valueFormatter: (val) => dayjs(val).format('MMMM D, YYYY')
            }
        ];
    }, []);
    const { isFetching: tableLoading, data: history } = useQuery({
        refetchOnMount: false,
        initialData: { items, totalCount },
        queryKey: ['get-credit-usage', pagination.page, pagination.pageSize],
        queryFn: async () => {
            const res = await getCreditUsage({ page: pagination.page, page_size: pagination.pageSize });
            return res.history;
        }
    });
    const { isPending: exportLoading, mutateAsync: fetchAllHistory } = useMutation({
        mutationFn: async () => {
            const res = await getCreditUsage({ all: true });
            return res.history;
        }
    });
    const exportHandler = async () => {
        const { items } = await fetchAllHistory();
        if (!items.length) {
            setSnackbar({ show: true, type: 'error', message: 'Your history is empty !' });
        } else {
            setSnackbar({ show: false, type: 'error', message: '' });
            const normalizeItems = items.map(({ id, date, ...rest }) => ({
                ...rest,
                date: dayjs(date).utc().format('YYYY-MM-DD HH:mm')
            }));
            const headers = Object.keys(normalizeItems[0]);
            const rows = normalizeItems.map((item) => Object.values(item));
            const blob = await generateExcel({ data: [headers, ...rows] });
            downloadFile({
                blob,
                extension: 'xlsx',
                filename: `Credit Usage History_${dayjs().format('YYYY-MM-DD')}`
            });
        }
    };

    return (
        <Box {...rest}>
            <Stack justifyContent='space-between' alignItems='center' gap={4}>
                <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                    Requests History
                </Typography>
                <Button
                    variant='contained'
                    size='medium'
                    color='neutral'
                    bgColor='neutral.dark4'
                    loading={exportLoading}
                    onClick={exportHandler}
                    sx={{ px: 6 }}
                    className='shadow-xs'
                >
                    <Icon icon='ph:file-arrow-down' size='2sm' color='white' className='mr-2' />
                    Export
                </Button>
            </Stack>
            <Box mt={8}>
                <DataTable
                    columns={columns}
                    rows={history.items}
                    loading={tableLoading}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    pagination
                    paginationMode='server'
                    paginationModel={pagination}
                    onPaginationModelChange={(val) => setPagination(val)}
                    rowCount={history.totalCount}
                    sx={{
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderRadius: 0,
                        '& .MuiDataGrid-columnHeader': {
                            borderBottom: 'none !important'
                        },
                        '& .cell-type': {
                            textTransform: 'capitalize'
                        }
                    }}
                />
            </Box>
        </Box>
    );
}
