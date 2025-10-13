'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Icon from '@/components/Icon';
import PlanCard from '@dashboard/components/plan/Card';
import PaymentMessage from '@dashboard/components/plan/PaymentMessage';
import { getPlans } from '@dashboard/services/plan';
import { Duration, PaymentStatus } from '@dashboard/types/Plan';

type Props = BoxProps & {};

const InlineSwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 42,
    '& .MuiButtonBase-root': {
        left: '9%',
        '&.Mui-checked': {
            left: '5%'
        },
        top: '12%'
    },
    '& .MuiSwitch-thumb': {
        width: 14,
        height: 14,
        boxShadow: 'none',
        backgroundColor: 'white'
    },
    '& .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10,
        opacity: '1 !important'
    }
}));

export default function PlansList({ ...rest }: Props) {
    const searchParams = useSearchParams();
    const paymentStatusQuery = searchParams.get('status') as PaymentStatus;
    const [duration, setDuration] = useState<Duration>(Duration.MONTHLY);
    const [paymentDialog, setPaymentDialog] = useState(
        paymentStatusQuery === PaymentStatus.SUCCESS || paymentStatusQuery === PaymentStatus.FAILED
    );
    const { isFetching, data: plans } = useQuery({
        initialData: [],
        queryKey: ['get-plans-list'],
        queryFn: async () => {
            const res = await getPlans();
            return res.items;
        }
    });
    const filteredPlans = plans.filter((plan) => plan.duration === duration); // get all plans and manually filter them

    return (
        <Box {...rest}>
            <Typography component='h2' variant='headlineLg' color='neutral.dark4' align='center'>
                Select the right plan for your business.
            </Typography>
            <Box mt={5}>
                <Stack justifyContent='center' alignItems='center' gap={1}>
                    <Typography
                        role='button'
                        onClick={() => setDuration(Duration.MONTHLY)}
                        component='span'
                        variant='labelLg'
                        color='neutral.dark4'
                        sx={{ cursor: 'pointer' }}
                    >
                        Monthly
                    </Typography>
                    <InlineSwitch
                        checked={duration === Duration.YEARLY}
                        onChange={(e) => setDuration(e.target.checked ? Duration.YEARLY : Duration.MONTHLY)}
                        color='primary'
                        size='medium'
                    />
                    <Typography
                        role='button'
                        onClick={() => setDuration(Duration.YEARLY)}
                        component='span'
                        variant='labelLg'
                        color='neutral.dark4'
                        sx={{ cursor: 'pointer' }}
                    >
                        Annual
                    </Typography>
                </Stack>
                <Typography component='p' variant='bodySm' color='primary' align='center'>
                    (Pay annual and save 30%)
                </Typography>
            </Box>
            <Box mt={8}>
                <Grid container justifyContent='center' spacing={2}>
                    {isFetching &&
                        Array.from({ length: 4 }).map((_, i) => (
                            <Grid key={i} size={{ mobile: 12, tablet: 6, laptop: 4, desktop: 3 }}>
                                <Skeleton variant='rounded' height={350} />
                            </Grid>
                        ))}
                    {!isFetching && (
                        <>
                            {filteredPlans.map((plan, i) => (
                                <Grid
                                    key={plan.id}
                                    size={{
                                        mobile: 12,
                                        tablet: 6,
                                        laptop: 4,
                                        desktop: 3
                                    }}
                                >
                                    <PlanCard {...plan} sx={{ height: 1 }} />
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>
            </Box>
            <Dialog
                open={paymentDialog}
                onClose={() => setPaymentDialog(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 550,
                            maxWidth: '90vw',
                            bgcolor: 'white',
                            borderRadius: 3
                        }
                    }
                }}
            >
                <DialogContent sx={{ px: 4, py: 6 }}>
                    <Stack justifyContent='flex-end'>
                        <IconButton size='small' onClick={() => setPaymentDialog(false)}>
                            <Icon icon='mdi:close' size='sm' color='neutral.light2' />
                        </IconButton>
                    </Stack>
                    <PaymentMessage mt={2} status={paymentStatusQuery} onBtnClick={() => setPaymentDialog(false)} />
                </DialogContent>
            </Dialog>
        </Box>
    );
}
