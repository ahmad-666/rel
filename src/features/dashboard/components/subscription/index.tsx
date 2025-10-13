'use client';

import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import PlanActiveCard from '@dashboard/components/subscription/ActiveCard';
import CreditCard from '@dashboard/components/subscription/CreditCard';
import BillingInfo from '@dashboard/components/subscription/BillingInfo';
import { getBillingInfo } from '@dashboard/services/plan';

export default function Subscriptions() {
    const { isFetching, data: billingInfo } = useQuery({
        initialData: {
            user: { name: '', address: '' },
            creditCard: { brand: '', value: '', expirationDate: '' },
            portalUrl: ''
        },
        queryKey: ['get-billing-info'],
        queryFn: async () => {
            const res = await getBillingInfo();
            return res;
        }
    });

    return (
        <Box>
            {isFetching && <Skeleton animation='wave' height={400} sx={{ transform: 'initial' }} />}
            {!isFetching && (
                <Box>
                    <PlanActiveCard portalUrl={billingInfo.portalUrl} />
                    <Stack mt={16} direction={{ mobile: 'column', laptop: 'row' }} gap={4}>
                        {!!billingInfo.creditCard.value && (
                            <CreditCard
                                flexGrow={1}
                                creditCard={billingInfo.creditCard}
                                portalUrl={billingInfo.portalUrl}
                            />
                        )}
                        {!!billingInfo.user.name && (
                            <BillingInfo flexGrow={1} user={billingInfo.user} portalUrl={billingInfo.portalUrl} />
                        )}
                    </Stack>
                </Box>
            )}
        </Box>
    );
}
