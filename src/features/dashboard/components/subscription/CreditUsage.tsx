'use client';

import { useQuery } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CreditUsageChart from '@dashboard/components/subscription/CreditUsageChart';
import CreditUsageTable from '@dashboard/components/subscription/CreditUsageTable';
import { getCreditUsage } from '@dashboard/services/plan';

type Props = BoxProps & {};

const defaultPageSize = 10;

export default function CreditUsage({ ...rest }: Props) {
    const { isFetching, data: creditUsage } = useQuery({
        initialData: {
            statistics: {
                items: []
            },
            history: {
                items: [],
                totalCount: 0
            }
        },
        queryKey: ['get-credits-usage', 1, defaultPageSize], //'1' refers to first page
        queryFn: async () => {
            const res = await getCreditUsage({ page: 1, page_size: defaultPageSize });
            return res;
        }
    });
    const { statistics, history } = creditUsage;

    return (
        <Box {...rest}>
            {isFetching && (
                <Box>
                    <Skeleton variant='rounded' height={300} />
                    <Skeleton variant='rounded' height={300} sx={{ mt: 15 }} />
                </Box>
            )}
            {!isFetching && (
                <Box>
                    {!!statistics.items.length && <CreditUsageChart height={300} items={statistics.items} />}
                    <CreditUsageTable
                        mt={18}
                        pageSize={defaultPageSize}
                        totalCount={history.totalCount}
                        items={history.items}
                    />
                </Box>
            )}
        </Box>
    );
}
