'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useGridApiRef, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid-pro';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import Textfield from '@/components/Textfield/Mui';
import DataTable from '@/components/DataTable/Mui';
import ActionsMenu from '@dashboard/components/ActionsMenu';
import BulkUploadForm from '@dashboard/components/bulks/UploadForm';
import IntegrationsList from '@dashboard/components/integrations/Lists';
import DeleteDialog from '@/components/DeleteDialog/Mui';
import BulksEmptyState from '@dashboard/components/bulks/EmptyState';
import ProcessedAlert from '@dashboard/components/bulks/ProcessedAlert';
import useDebounce from '@/hooks/useDebounce';
import dayjs from '@/libs/dayjs';
import { getBulks, getBulk, deleteBulk } from '@dashboard/services/bulk';
import { downloadFile, generateExcel } from '@/utils/file';
import { parseBulkStatus } from '@dashboard/utils';
import { Status, type Bulk } from '@dashboard/types/Bulk';

type Props = BoxProps & {
    showUpload?: boolean;
};

const intl = new Intl.NumberFormat('en-US');
const defaultPageSize = 10;
const minSearchLength = 3;

export default function BulksList({ showUpload = false, ...rest }: Props) {
    const tableRef = useGridApiRef();
    const router = useRouter();
    const pathname = usePathname();
    const [crmMenuEl, setCrmMenuEl] = useState<null | HTMLButtonElement>(null);
    const [actionsMenuEl, setActionsMenuEl] = useState<null | HTMLButtonElement>(null);
    const [isEmpty, setIsEmpty] = useState(false);
    const [activeBulk, setActiveBulk] = useState<null | Bulk>(null);
    const [addDialog, setAddDialog] = useState(showUpload);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [pagination, setPagination] = useState<GridPaginationModel>({ page: 1, pageSize: defaultPageSize });
    const [search, setSearch] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    useDebounce({
        value: search,
        timeout: 1000,
        cb: (debounceVal) => {
            if (!debounceVal || debounceVal.length >= minSearchLength) {
                //if we clear debounceVal or if length is bigger than minSearchLength
                setDebounceSearch(debounceVal);
                setPagination((old) => ({ ...old, page: 1 }));
            }
        }
    });
    const {
        isFetching: bulksListLoading,
        data: bulks,
        refetch: fetchBulks
    } = useQuery({
        enabled: true,
        initialData: { items: [], totalCount: 0 },
        refetchInterval: (query) =>
            query.state.data?.items?.find((bulk) => bulk.status === Status.PROCESSING) ? 1_000 : false,
        queryKey: ['get-bulks', debounceSearch, pagination.page, pagination.pageSize],
        queryFn: async () => {
            const { items, totalCount } = await getBulks({
                query: debounceSearch.length >= minSearchLength ? debounceSearch : undefined,
                page: pagination.page,
                page_size: pagination.pageSize
            });
            if (!debounceSearch && !totalCount) setIsEmpty(true);
            else setIsEmpty(false);
            return { items, totalCount };
        }
    });
    // const { isPending: bulkDownloadLoading, mutateAsync: downloadBulkMutate } = useMutation({
    //     mutationFn: async (id: number) => {
    //         await downloadBulk(id);
    //     },
    //     onSuccess: async (_, id) => {
    //         tableRef.current?.updateRows([{ id, status: Status.DOWNLOADED }]);
    //     }
    // });
    const { isPending: bulkLoading, mutateAsync: getBulkMutate } = useMutation({
        mutationFn: async (id: number) => {
            //first get bulk then we create downloadable file with bulk.data and then we update that specific table row status without sending extra getBulks req
            const bulk = await getBulk({ id, downloadMode: true });
            return bulk;
        },
        onSuccess: async ({ id, name, data }) => {
            const headers = Object.keys(data[0]);
            const rows = data.map((d) => Object.values(d));
            const blob = await generateExcel({ data: [headers, ...rows] });
            downloadFile({ filename: name, extension: 'xlsx', blob });
            tableRef.current?.updateRows([{ id, status: Status.DOWNLOADED }]);
            // await downloadBulkMutate(id);
        }
    });
    const { isPending: deleteLoading, mutateAsync: deleteBulkMutate } = useMutation({
        mutationFn: async (id: number) => {
            await deleteBulk(id);
        },
        onSuccess: async () => {
            setDeleteDialog(false);
            setActionsMenuEl(null);
            setActiveBulk(null);
            if (pagination.page > 1 && pagination.page > Math.ceil((bulks.totalCount - 1) / pagination.pageSize)) {
                // if last page became empty we reduce page by 1 and send http req again
                setPagination((old) => ({ ...old, page: old.page - 1 }));
            } else await fetchBulks();
        }
    });
    const processingBulk = bulks.items.find((bulk) => bulk.status === Status.PROCESSING);
    const columns = useMemo<GridColDef<Bulk>[]>(() => {
        return [
            {
                field: 'name',
                headerName: 'Name',
                width: 300,
                renderCell: ({ value, row }) => {
                    return (
                        <Box
                            sx={{
                                a: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                },
                                img: {
                                    flexShrink: 0,
                                    width: 30
                                }
                            }}
                        >
                            <Link href={`/dashboard/bulks/${row.id}`}>
                                <Image src={`/imgs/others/xlsx.svg`} alt='xlsx' width={50} height={50} />
                                {value}
                            </Link>
                        </Box>
                    );
                }
            },
            {
                field: 'totalRecords',
                headerName: 'Number of contacts',
                valueFormatter: (value) => `${intl.format(value)}`,
                width: 300
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 300,
                renderCell: ({ value }) => {
                    const { text, emoji } = parseBulkStatus(value);
                    return (
                        <Typography component='p' variant='labelMd' color='neutral.dark4'>
                            {emoji} {text}
                        </Typography>
                    );
                }
            },
            {
                field: 'createdAt',
                headerName: 'Created',
                width: 300,
                valueFormatter: (value) => dayjs(value).format('MMMM D, YYYY')
            },
            {
                field: 'actions',
                headerName: 'Actions',
                minWidth: 200,
                flex: 1,
                renderCell: ({ row }) => {
                    return row.status !== Status.PROCESSING ? (
                        <Stack gap={2}>
                            <Button
                                size='small'
                                variant='outlined'
                                borderColor='neutral.light2'
                                textColor='neutral.dark4'
                                onClick={(e) => {
                                    setActiveBulk(row);
                                    setCrmMenuEl(e.currentTarget);
                                }}
                            >
                                Push to CRM
                                <Icon
                                    icon='ph:caret-down'
                                    size='sm'
                                    color='neutral.dark4'
                                    className='ml-2 transition-transform'
                                    style={{
                                        rotate: !!crmMenuEl && activeBulk?.id === row.id ? '180deg' : '0deg'
                                    }}
                                />
                            </Button>
                            <IconButton
                                size='small'
                                color='primary'
                                onClick={(e) => {
                                    setActiveBulk(row);
                                    setActionsMenuEl(e.currentTarget);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    border: 1,
                                    borderColor: 'neutral.light2'
                                }}
                            >
                                <Icon icon='ph:dots-three-outline-fill' size='2sm' color='neutral.dark4' />
                            </IconButton>
                        </Stack>
                    ) : null;
                }
            }
        ];
    }, [activeBulk, crmMenuEl]);
    useEffect(() => {
        //* remove ?upload=true url query if we are going to close the upload bulk dialog
        if (!addDialog) router.replace(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addDialog]);

    return (
        <Box {...rest}>
            {!bulksListLoading && isEmpty ? (
                <BulksEmptyState
                    mt={30}
                    mx='auto'
                    maxWidth={1}
                    width={550}
                    onBulkSubmit={async () => {
                        if (pagination.page !== 1) setPagination((old) => ({ ...old, page: 1 }));
                        else await fetchBulks();
                    }}
                />
            ) : (
                <Box>
                    <Stack
                        direction={{ mobile: 'column', tablet: 'row' }}
                        justifyContent='space-between'
                        alignItems={{ mobile: 'flex-start', tablet: 'center' }}
                        gap={4}
                    >
                        <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                            Bulks
                        </Typography>
                        <Stack alignItems='flex-start' flexWrap='wrap' gap={3}>
                            <Textfield
                                variant='outlined'
                                size='sm'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search ...'
                                prependInnerIcon='ph:magnifying-glass'
                                helperText={`At least enter ${minSearchLength} characters`}
                                sx={{ width: 270 }}
                            />
                            <Divider orientation='vertical' sx={{ borderColor: 'neutral.light2', height: 28 }} />
                            <Button
                                variant='contained'
                                size='medium'
                                color='primary'
                                onClick={() => setAddDialog(true)}
                            >
                                <Icon icon='ph:plus' size='2sm' color='white' className='mr-2' />
                                New Bulk
                            </Button>
                        </Stack>
                    </Stack>
                    {!!processingBulk && <ProcessedAlert mt={6} bulkName={processingBulk.name} />}
                    <DataTable
                        getRowId={(row) => row.id}
                        apiRef={tableRef}
                        columns={columns}
                        rows={bulks.items}
                        loading={bulksListLoading || bulkLoading}
                        // filterMode='client'
                        // filterModel={{
                        //     items: [],
                        //     quickFilterValues: [search]
                        // }}
                        showColumnVerticalBorder
                        showCellVerticalBorder
                        disableColumnFilter
                        rowCount={bulks.totalCount}
                        pagination
                        paginationMode='server'
                        paginationModel={pagination}
                        onPaginationModelChange={(newVal) => setPagination(newVal)}
                        containerSx={{ mt: 6 }}
                        sx={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderRadius: 0,
                            '& .MuiDataGrid-columnHeader': {
                                borderBottom: 'none !important'
                            }
                        }}
                    />
                    <Dialog
                        open={addDialog}
                        onClose={() => setAddDialog(false)}
                        slotProps={{
                            paper: {
                                sx: {
                                    width: 600,
                                    maxWidth: '90vw',
                                    bgcolor: 'white',
                                    borderRadius: 3
                                }
                            }
                        }}
                    >
                        <DialogContent>
                            <BulkUploadForm
                                closable
                                onClose={() => setAddDialog(false)}
                                onBulkSubmit={async () => {
                                    setAddDialog(false);
                                    if (pagination.page !== 1) setPagination((old) => ({ ...old, page: 1 }));
                                    else await fetchBulks();
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </Box>
            )}
            <Menu
                anchorEl={crmMenuEl}
                open={!!crmMenuEl}
                onClose={() => setCrmMenuEl(null)}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 3,
                            padding: 3,
                            width: 300,
                            maxWidth: '100%',
                            bgcolor: 'white',
                            border: 1,
                            borderColor: 'neutral.light2',
                            borderRadius: 3,
                            boxShadow: 'none'
                        }
                    }
                }}
            >
                <IntegrationsList variant='crm' bulkId={activeBulk?.id} />
            </Menu>
            <ActionsMenu
                anchorEl={actionsMenuEl}
                onClose={() => {
                    setActionsMenuEl(null);
                    setActiveBulk(null);
                }}
                items={[
                    {
                        icon: 'ph:file-arrow-down',
                        label: 'Download',
                        loading: bulkLoading,
                        onClick: async () => {
                            await getBulkMutate(activeBulk?.id as number);
                        }
                    },
                    {
                        icon: 'ph:trash-simple',
                        label: 'Delete',
                        textColor: 'error.dark4',
                        bgColor: 'error.light5',
                        loading: deleteLoading,
                        onClick: async () => {
                            setDeleteDialog(true);
                        }
                    }
                ]}
            />
            <DeleteDialog
                show={deleteDialog}
                onShowChange={(val) => setDeleteDialog(val)}
                title='Delete Bulk'
                description={
                    <>
                        Are you sure that you want to delete{' '}
                        <Typography component='span' fontWeight='bold'>{`"${activeBulk?.name}"`}</Typography> ?
                    </>
                }
                loading={deleteLoading}
                onSubmitClick={async () => {
                    await deleteBulkMutate(activeBulk?.id as number);
                }}
            />
        </Box>
    );
}
