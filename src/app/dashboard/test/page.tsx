'use client';

import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import envs from '@/configs/env';
import Button from '@/components/Button/Mui';

export default function TestPage() {
    if (envs.appType !== 'test') notFound();

    return (
        <Box>
            <Button variant='contained' color='primary'>
                test
            </Button>
            <Button variant='outlined' color='primary'>
                test
            </Button>
            <Button variant='text' color='primary'>
                test
            </Button>
        </Box>
    );
}
