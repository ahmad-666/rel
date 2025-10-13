'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import { alpha } from '@mui/material/styles';
import { getCreditCardImage } from '@dashboard/utils';
import { type UserBilling } from '@dashboard/types/Plan';

type Item = {
    id: number;
    title?: string;
    value: ReactNode;
};
type Row = {
    id: number;
    items: [Item, Item];
};
type Props = BoxProps & Pick<UserBilling, 'creditCard' | 'portalUrl'>;

export default function PaymentCreditCard({ creditCard, portalUrl, ...rest }: Props) {
    const imgSrc = getCreditCardImage(creditCard.brand);
    const rows: Row[] = [
        {
            id: 1,
            items: [
                {
                    id: 1,
                    title: 'Card Number',
                    value: creditCard.value
                },
                {
                    id: 2,
                    value: imgSrc ? (
                        <Image
                            src={imgSrc}
                            alt={creditCard.brand}
                            width={75}
                            height={75}
                            style={{
                                maxWidth: '50px',
                                maxHeight: '50px'
                            }}
                        />
                    ) : null
                }
            ]
        },
        {
            id: 2,
            items: [
                {
                    id: 1,
                    title: 'Name',
                    value: creditCard.brand
                },
                {
                    id: 2,
                    title: 'Expires',
                    value: creditCard.expirationDate
                }
            ]
        }
    ];

    return (
        <Box {...rest}>
            <Typography component='h6' variant='titleMd' color='neutral.dark4'>
                Payment Method
            </Typography>
            <Box
                mt={4}
                py={5}
                px={10}
                border={1}
                borderColor='neutral.light3'
                borderRadius={3}
                sx={{
                    backgroundImage: (theme) =>
                        `linear-gradient(to right bottom,transparent 20%,${alpha(theme.palette.primary.main, 0.15)},transparent 80%)`
                }}
            >
                {rows.map((row) => (
                    <Stack
                        key={row.id}
                        justifyContent='space-between'
                        alignItems='center'
                        gap={4}
                        sx={{
                            '&:not(:first-child)': {
                                mt: 5
                            }
                        }}
                    >
                        {row.items.map((item) => (
                            <Box key={item.id}>
                                {!!item.title && (
                                    <Typography component='h6' variant='labelMd' color='neutral'>
                                        {item.title}
                                    </Typography>
                                )}
                                <Box mt={2} typography='labelLg' color='neutral.dark4'>
                                    {item.value}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                ))}
                <Stack mt={7} justifyContent='flex-end' flexWrap='wrap' gap={2}>
                    <Button
                        disabled={!portalUrl}
                        target='_blank'
                        href={portalUrl}
                        variant='outlined'
                        size='small'
                        color='neutral'
                        borderColor='neutral.light2'
                        textColor='neutral.dark4'
                    >
                        Edit Card
                    </Button>
                    <Button
                        disabled={!portalUrl}
                        target='_blank'
                        href={portalUrl}
                        variant='outlined'
                        size='small'
                        color='error'
                        borderColor='neutral.light2'
                        textColor='error.dark'
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
