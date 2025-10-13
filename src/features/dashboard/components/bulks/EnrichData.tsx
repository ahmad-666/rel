'use client';

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box, { type BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type GridColDef } from '@mui/x-data-grid-pro';
import DataTable from '@/components/DataTable/Mui';
import { type Bulk } from '@dashboard/types/Bulk';

type Props = BoxProps & Pick<Bulk, 'data'> & { loading?: boolean };

export default function BulkEnrichData({ data = [], loading = false, ...rest }: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('laptop'));

    const rows = useMemo(() => {
        return data.map((d, i) => ({ ...d, idx: i }));
    }, [data]);
    const columns = useMemo<GridColDef[]>(() => {
        const headers = Object.keys(rows[0]).filter((header) => header !== 'idx');
        return headers.map((header) => ({
            field: header,
            headerName: header,
            width: isMobile ? 150 : 300
        }));
    }, [rows, isMobile]);

    return (
        <Box {...rest}>
            <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                Previews
            </Typography>
            <DataTable
                getRowId={(row) => row.idx}
                columns={columns}
                rows={rows}
                loading={loading}
                containerSx={{ mt: 10 }}
                sx={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderRadius: 0,
                    '& .MuiDataGrid-columnHeader': {
                        borderBottom: 'none !important'
                    }
                }}
            />
        </Box>
    );
}
