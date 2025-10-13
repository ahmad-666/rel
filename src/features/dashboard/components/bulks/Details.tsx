'use client';

import { useQuery } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Icon from '@/components/Icon';
import Button from '@/components/Button/Mui';
import BulkSummery from '@dashboard/components/bulks/Summery';
import BulkEnrichData from '@dashboard/components/bulks/EnrichData';
import { getBulk } from '@dashboard/services/bulk';
import { Status } from '@dashboard/types/Bulk';

type Props = BoxProps & {
    bulkId: number;
};

export default function BulkDetails({ bulkId, ...rest }: Props) {
    const { isFetching, data: bulk } = useQuery({
        initialData: null,
        refetchInterval: (query) => (query.state.data?.status === Status.PROCESSING ? 10_000 : false),
        queryKey: ['get-bulk-details', bulkId],
        queryFn: async () => {
            const bulk = await getBulk({ id: bulkId, downloadMode: false });
            return bulk;
        }
    });
    const isInitLoader = isFetching && !bulk;

    return (
        <Box {...rest}>
            {isInitLoader && (
                <Box>
                    <Box>
                        <Skeleton variant='text' width={300} height={50} />
                        <Stack mt={4} gap={4}>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} variant='text' width='25%' height={50} />
                            ))}
                        </Stack>
                    </Box>
                    <Skeleton variant='rounded' height={300} sx={{ mt: 15 }} />
                </Box>
            )}
            {!!(!isInitLoader && bulk) && (
                <Box>
                    <Breadcrumbs separator={<Icon icon='ph:caret-right' size='sm' color='neutral.dark4' />}>
                        <Button
                            variant='text'
                            size='medium'
                            color='primary'
                            textColor='neutral.dark4'
                            href='/dashboard/bulks'
                            sx={{ minWidth: 0, px: 1, typography: 'titleLg' }}
                        >
                            Bulks
                        </Button>
                        <Button
                            variant='text'
                            size='medium'
                            color='primary'
                            textColor='neutral.light1'
                            href={`/dashboard/bulks/${bulkId}`}
                            sx={{ minWidth: 0, px: 1, typography: 'titleLg' }}
                        >
                            Email List File
                        </Button>
                    </Breadcrumbs>
                    <BulkSummery mt={6} {...bulk} />
                    <BulkEnrichData mt={18} data={bulk.data} loading={isFetching} />
                </Box>
            )}
        </Box>
    );
}
