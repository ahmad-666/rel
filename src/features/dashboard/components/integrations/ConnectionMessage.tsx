'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import integrations from '@dashboard/data/integrations';
import { connectTo, disconnectFrom } from '@dashboard/services/integrations';
import { Company, Status } from '@dashboard/types/Integration';

type Props = {
    company: Company;
    status: Status;
};

export default function ConnectionMessage({ company, status }: Props) {
    const searchParams = useSearchParams();
    const integration = integrations.find((integration) => integration.company === company);
    const { mutate } = useMutation({
        mutationFn: async () => {
            if (status === Status.CONNECT) await connectTo({ company, code: searchParams.get('code')! });
            else await disconnectFrom({ company });
        }
    });
    useEffect(() => {
        mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog
            open
            //  onClose={()=>{}}
            slotProps={{
                paper: {
                    sx: {
                        width: 400,
                        maxWidth: '90%',
                        bgcolor: 'white',
                        borderRadius: 4,
                        p: { mobile: 4, laptop: 8 }
                    }
                }
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                <Stack direction='column' alignItems='center' gap={5}>
                    <Box position='relative'>
                        <Image
                            src={integration?.fillImgSrc as string}
                            alt={integration?.title as string}
                            width={100}
                            height={100}
                            style={{ width: '60px', borderRadius: '10px' }}
                        />
                        <Box
                            sx={{
                                width: 22,
                                height: 22,
                                p: 0,
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                bgcolor: status === Status.CONNECT ? 'success.main' : 'error.main',
                                border: 2,
                                borderColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                right: '0',
                                bottom: '0',
                                transform: 'translate(25%,25%)'
                            }}
                        >
                            <Icon icon={status === Status.CONNECT ? 'ph:check' : 'ph:x'} color='white' size={12} />
                        </Box>
                    </Box>
                    <Typography component='p' variant='titleLg' color='neutral.dark4' align='center'>
                        {status === Status.CONNECT
                            ? `Now You’re Connected to ${company}`
                            : `You are disconnected from ${company} !`}
                    </Typography>
                    <Button
                        href='/dashboard/integrations'
                        size='medium'
                        color='neutral'
                        bgColor='neutral.dark4'
                        sx={{ mt: 10, px: 12 }}
                    >
                        {status === Status.CONNECT ? 'OK' : 'Back'}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
