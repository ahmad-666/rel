'use client';

import { type ReactNode } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import useStore from '@/store';
import dayjs from '@/libs/dayjs';
import { alpha } from '@mui/material/styles';
import { parsePlanStatus } from '@dashboard/utils';
import { Duration } from '@dashboard/types/Plan';

type Item = {
    title: string;
    content: ReactNode;
};
type Props = BoxProps & { portalUrl?: string };

export default function PlanActiveCard({ portalUrl, ...rest }: Props) {
    const { duration, status, name, endDate } = useStore((store) => store.user?.activePlan) || {};
    const {
        lightenColor: statusLightenColor,
        darkenColor: statusDarkenColor,
        text: statusText
    } = parsePlanStatus(status!);
    const items: Item[] = [
        {
            title: 'Plan',
            content: (
                <Typography component='h6' variant='headlineSm' color='neutral.dark4' lineHeight={1}>
                    {name}
                </Typography>
            )
        },
        {
            title: 'Status',
            content: (
                <Typography
                    component='p'
                    variant='labelMd'
                    sx={{
                        bgcolor: statusLightenColor,
                        color: statusDarkenColor,
                        border: 1,
                        borderColor: alpha(statusDarkenColor, 0.1),
                        borderRadius: 10,
                        px: 4,
                        py: 0.5
                    }}
                >
                    {statusText}
                </Typography>
            )
        },
        {
            title: 'Billing Period',
            content: (
                <Typography component='p' variant='inherit' color='inherit'>
                    {duration}
                    {duration === Duration.MONTHLY && (
                        <Typography ml={2} component='span' variant='bodySm' color='primary'>
                            (Pay annual and save 30%)
                        </Typography>
                    )}
                </Typography>
            )
        },
        {
            title: 'End Date',
            content: `${dayjs(endDate).format('MMMM DD, YYYY')} at ${dayjs(endDate).format('HH:mm A')}`
        }
    ];

    return (
        <Box {...rest}>
            <Stack justifyContent='space-between' alignItems='center' gap={4} flexWrap='wrap'>
                <Typography component='h4' variant='titleMd' color='neutral.dark4'>
                    Current Plan
                </Typography>
                <Button
                    disabled={!portalUrl}
                    target='_blank'
                    href={portalUrl}
                    variant='contained'
                    color='primary'
                    size='medium'
                    sx={{ px: 8 }}
                >
                    Manage Plan
                </Button>
            </Stack>
            <Box mt={3} p={{ mobile: 6, laptop: 10 }} border={1} borderColor='neutral.light3' borderRadius={3}>
                <Stack component='ul' gap={{ mobile: 8, laptop: 12, desktop: 16, desktopXl: 25 }} flexWrap='wrap'>
                    {items.map((item) => (
                        <Box key={item.title} component='li'>
                            <Typography component='h6' variant='labelMd' color='neutral'>
                                {item.title}
                            </Typography>
                            <Box
                                mt={4}
                                typography='labelLg'
                                color='neutral.dark4'
                                sx={{ textTransform: 'capitalize', lineHeight: 1 }}
                            >
                                {item.content}
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
