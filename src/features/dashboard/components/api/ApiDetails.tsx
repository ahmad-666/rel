'use client';

import { useState, useMemo, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GridColDef } from '@mui/x-data-grid-pro';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import DataTable from '@/components/DataTable/Mui';
import dayjs from '@/libs/dayjs';
import useSnackbar from '@/hooks/useSnackbar';
import useStore from '@/store';
import { generateApiKey } from '@dashboard/services/user';
import { type ApiRegenerate } from '@dashboard/types/User';

type Props = BoxProps & {};

export default function ApiDetails({ ...rest }: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
    const { setSnackbar } = useSnackbar();
    const [showKey, setShowKey] = useState(false);
    const apiKey = useStore((store) => store.user.apiKey);
    const apiKeyLastUpdate = useStore((store) => store.user.apiKeyLastUpdate);
    const updateUser = useStore((store) => store.updateUser);
    const renderedApiKey = showKey ? apiKey : apiKey.slice(-4).padStart(50, '*');
    const apiRow: ApiRegenerate = { apiKey, apiKeyLastUpdate };
    const copyToClipboard = useCallback(async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(apiKey);
            setSnackbar({ type: 'success', show: true, message: 'Copied ...' });
        } else {
            setSnackbar({ type: 'error', show: true, message: 'Your browser does not support this feature ...' });
        }
    }, [apiKey, setSnackbar]);
    const columns = useMemo<GridColDef<ApiRegenerate>[]>(() => {
        return [
            {
                field: 'apiKey',
                headerName: 'Your API Key',
                width: isMobile ? 420 : 600,
                renderCell: () => (
                    <Stack height={1} p={2} alignItems='center' gap={4} flexWrap='wrap'>
                        <Typography component='p' variant='labelLg' color='neutral.dark4'>
                            {renderedApiKey}
                        </Typography>
                        <Stack flexShrink={0} alignItems='center' gap={2}>
                            <Button
                                variant='outlined'
                                color='neutral'
                                borderColor='neutral.light2'
                                onClick={() => setShowKey((old) => !old)}
                                sx={{ minWidth: 'initial', width: 32, p: 1 }}
                            >
                                <Icon icon={showKey ? 'ph:eye-slash' : 'ph:eye'} size='sm' color='neutral.dark4' />
                            </Button>
                            <Button
                                variant='outlined'
                                color='neutral'
                                borderColor='neutral.light2'
                                onClick={copyToClipboard}
                                sx={{ minWidth: 'initial', width: 32, p: 1 }}
                            >
                                <Icon icon='ph:copy' size='sm' color='neutral.dark4' />
                            </Button>
                        </Stack>
                    </Stack>
                )
            },
            {
                field: 'apiKeyLastUpdate',
                headerName: 'Modified',
                minWidth: 150,
                flex: 1,
                valueFormatter: (val) => dayjs(val).format('MMMM D, YYYY')
            }
        ];
    }, [showKey, renderedApiKey, isMobile, copyToClipboard]);
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async () => {
            const res = await generateApiKey();
            return res;
        },
        onSuccess: (data) => {
            updateUser({ apiKey: data.apiKey, apiKeyLastUpdate: data.apiKeyLastUpdate });
            setShowKey(true);
            setSnackbar({ type: 'success', show: true, message: 'New API key generated' });
        }
    });

    return (
        <Box {...rest}>
            <Stack justifyContent='space-between' alignItems='center' gap={4} flexWrap='wrap'>
                <Typography component='h2' variant='titleLg' color='neutral.dark4'>
                    API
                </Typography>
                <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    loading={isPending}
                    onClick={async () => {
                        await mutateAsync();
                    }}
                >
                    Regenerate
                </Button>
            </Stack>
            <Stack mt={8} direction={{ mobile: 'column', desktopXl: 'row' }} gap={4}>
                <DataTable
                    columns={columns}
                    rows={[apiRow]}
                    getRowId={(row) => row.apiKey}
                    getRowHeight={() => 'auto'}
                    disableColumnMenu
                    disableColumnSorting
                    disableColumnResize
                    disableRowSelectionOnClick
                    showCellVerticalBorder={false}
                    showColumnVerticalBorder={false}
                    sx={{
                        '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                            border: 'none !important'
                        }
                    }}
                    containerSx={{ width: { mobile: 1, desktopXl: 1 / 2 } }}
                />
                <Stack
                    width={{ mobile: 1, desktopXl: 1 / 2 }}
                    p={5}
                    bgcolor='warning.light5'
                    borderRadius={3}
                    alignItems='center'
                    gap={4}
                >
                    <Icon icon='ph:warning-fill' size={34} color='warning.dark5' className='shrink-0' />
                    <Typography component='p' variant='bodySm' color='warning.dark5'>
                        Your API keys are like your passwords: make sure to always keep them hidden! Share them only
                        with services you trust.
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
