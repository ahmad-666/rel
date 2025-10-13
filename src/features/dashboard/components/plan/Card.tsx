'use client';

import { type FormEvent } from 'react';
import Image from 'next/image';
import Card, { type CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import useStore from '@/store';
import envs from '@/configs/env';
import { numberFormatter } from '@/utils';
import { sendLog } from '@dashboard/services/logger';
import { Type, type Plan } from '@dashboard/types/Plan';

type Props = CardProps & Plan;

const allFeatures = [
    'Credit-Back Guarantee For Unmatched Data',
    'Personal & Business Reverse Email Lookup',
    'CSV, XLSX, XLS exports',
    'API',
    '100% GDPR & CCPA compliant',
    'Support Priority'
];

export default function PlanCard({
    id,
    type,
    duration,
    status,
    name,
    isPopular = false,
    price = 0,
    totalCredits = 0,
    features = [],
    sx,
    ...rest
}: Props) {
    const user = useStore((store) => store.user);
    const { email, apiKey, activePlan } = user || {};
    const isDisabled = type === Type.Free || (activePlan?.type === type && activePlan?.duration === duration); //free plan or plan that currently user has should be disabled
    const submitHandler = (e: FormEvent) => {
        //? For prevent errors like "NS_BINDING_ABORTED" in firefox , ... we don't use 'await' and instead use setTimeout
        if (isDisabled) return e.preventDefault();
        try {
            setTimeout(() => {
                sendLog({ event: 'select plan', meta_data: { price_id: id } });
            }, 0);
            return null;
        } catch {}
    };

    return (
        <Card
            sx={{
                borderRadius: 3,
                border: isPopular ? 2 : 1,
                borderColor: isPopular ? 'primary.main' : 'neutral.light3',
                p: 0,
                ...sx
            }}
            {...rest}
        >
            <CardContent sx={{ p: 6, pb: 0 }}>
                <Stack justifyContent='space-between' alignItems='center' gap={2}>
                    <Typography component='h3' variant='headlineSm' color='neutral.dark4' textTransform='capitalize'>
                        {name}
                    </Typography>
                    {isPopular && (
                        <Chip
                            size='small'
                            color='warning'
                            label={
                                <Typography component='p' variant='labelMd' color='warning.dark'>
                                    Popular
                                </Typography>
                            }
                            sx={{
                                bgcolor: 'warning.light2'
                            }}
                        />
                    )}
                </Stack>
                <Box mt={10}>
                    <Typography component='p' variant='displaySm' color='neutral.dark4'>
                        ${numberFormatter(price)}
                    </Typography>
                    <Typography mt={1} component='p' variant='bodyMd' color='neutral'>
                        Month
                    </Typography>
                </Box>
                <Stack mt={8} justifyContent='center' alignItems='center' gap={1}>
                    <Image
                        src='/imgs/others/triangle.png'
                        alt='credits'
                        width={30}
                        height={30}
                        style={{ flexShrink: 0, width: '25px' }}
                    />
                    <Typography component='p' variant='labelLg' color='neutral.dark4'>
                        {numberFormatter(totalCredits)} monthly credits
                    </Typography>
                </Stack>
                <form method='POST' action={`${envs.apiUrl}/v1/subscriptions`} onSubmit={submitHandler}>
                    <input type='hidden' name='price_id' value={id} />
                    <input type='hidden' name='email' value={email} />
                    <input type='hidden' name='api_key' value={apiKey} />
                    <Button type='submit' size='large' fullWidth disabled={isDisabled} sx={{ mt: 4 }}>
                        Select Plan
                    </Button>
                </form>
            </CardContent>
            <Divider sx={{ mt: 10, mb: 6, borderColor: 'neutral.light3' }} />
            <CardContent sx={{ p: 6, pt: 0 }}>
                <List>
                    {allFeatures.map((feature) => {
                        const hasFeature = features.includes(feature);
                        return (
                            <ListItem
                                key={feature}
                                sx={{
                                    px: 0,
                                    py: 1.5,
                                    opacity: hasFeature ? 1 : 0.35
                                }}
                            >
                                <Icon
                                    icon={hasFeature ? 'ph:check-circle' : 'ph:x'}
                                    size={hasFeature ? '2sm' : 'sm'}
                                    color='neutral.dark4'
                                    className='shrink-0'
                                />
                                <Typography component='p' variant='bodyMd' color='neutral.dark4' ml={2}>
                                    {feature}
                                </Typography>
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
}
