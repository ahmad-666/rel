'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import IntegrationsList from '@dashboard/components/integrations/Lists';
import DeleteDialog from '@/components/DeleteDialog/Mui';
import dayjs from '@/libs/dayjs';
import { EMAIL_LOOKUP_CREDIT_COST } from '@dashboard/configs';
import { downloadBulk, deleteBulk } from '@dashboard/services/bulk';
import { parseBulkStatus } from '@dashboard/utils';
import { generateExcel, downloadFile } from '@/utils/file';
import { Status, type Bulk } from '@dashboard/types/Bulk';

type Item = {
    title: string;
    content?: ReactNode;
};
type Props = Omit<BoxProps, 'id'> & Bulk & {};

const intl = new Intl.NumberFormat('en-US');

export default function BulkSummery({
    id,
    status,
    name,
    totalRecords,
    passedRecords,
    data,
    createdAt,
    ...rest
}: Props) {
    const router = useRouter();
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [statusLocal, setStatusLocal] = useState<Status>(status);
    const [crmMenuEl, setCrmMenuEl] = useState<null | HTMLButtonElement>(null);
    const parsedStatus = parseBulkStatus(statusLocal);
    const items: Item[] = [
        {
            title: 'Status',
            content: (
                <>
                    {parsedStatus.emoji} {parsedStatus.text}
                </>
            )
        },
        {
            title: 'Number of Contacts',
            content: intl.format(totalRecords)
        },
        {
            title: 'Data Found',
            content: intl.format(passedRecords)
        },
        {
            title: 'Created',
            content: dayjs(createdAt).format('MMMM D, YYYY')
        },
        {
            title: 'Credits Usage',
            content: (
                <Stack mt={-1} alignItems='center' gap={1}>
                    <Image
                        src='/imgs/others/triangle.png'
                        alt='credits'
                        width={50}
                        height={50}
                        style={{ flexShrink: 0, width: '24px' }}
                    />
                    <Typography component='p' variant='labelMd' color='neutral.dark4'>
                        {intl.format(totalRecords * EMAIL_LOOKUP_CREDIT_COST)}
                    </Typography>
                </Stack>
            )
        }
    ];
    const { isPending: downloadLoading, mutateAsync: downloadMutate } = useMutation({
        mutationFn: async (id: number) => {
            await downloadBulk(id);
        },
        onSuccess: async () => {
            setStatusLocal(Status.DOWNLOADED);
        }
    });
    const { isPending: deleteLoading, mutateAsync: deleteMutate } = useMutation({
        mutationFn: async (id: number) => {
            await deleteBulk(id);
        },
        onSuccess: () => {
            router.replace('/dashboard/bulks');
            setDeleteDialog(false);
        }
    });
    const downloadHandler = async () => {
        const headers = Object.keys(data[0]);
        const rows = data.map((d) => Object.values(d));
        const blob = await generateExcel({
            data: [headers, ...rows]
        });
        downloadFile({
            filename: name,
            extension: 'xlsx',
            blob
        });
        await downloadMutate(id);
    };

    return (
        <Box overflow='hidden' p={6} border={1} borderColor='neutral.light3' borderRadius={3} {...rest}>
            <Box>
                <Stack
                    direction={{
                        mobile: 'column',
                        tablet: 'row'
                    }}
                    justifyContent='space-between'
                    alignItems={{ mobile: 'flex-start', tablet: 'center' }}
                    gap={4}
                >
                    <Stack alignItems='center' gap={2}>
                        <Image
                            src='/imgs/others/xlsx.svg'
                            alt='file'
                            width={100}
                            height={100}
                            style={{ width: '70px' }}
                        />
                        <Typography component='p' variant='labelLg' color='neutral.dark4'>
                            {name}
                        </Typography>
                    </Stack>
                    {status !== Status.PROCESSING && (
                        <Stack alignItems='center' gap={2} flexWrap='wrap'>
                            <Button
                                variant='outlined'
                                color='error'
                                size='medium'
                                borderColor='neutral.light2'
                                onClick={() => setDeleteDialog(true)}
                                sx={{
                                    p: 1,
                                    width: 40,
                                    minWidth: 0
                                }}
                            >
                                <Icon icon='ph:trash-simple' size='2sm' color='error.dark4' />
                            </Button>
                            <Divider orientation='vertical' sx={{ borderColor: 'neutral.light2', height: 15 }} />
                            <Button
                                size='medium'
                                variant='outlined'
                                borderColor='neutral.light2'
                                textColor='neutral.dark4'
                                onClick={(e) => setCrmMenuEl(e.currentTarget)}
                            >
                                Push to CRM
                                <Icon
                                    icon='ph:caret-down'
                                    size='sm'
                                    color='neutral.dark4'
                                    className='ml-2 transition-transform'
                                    style={{
                                        rotate: !!crmMenuEl ? '180deg' : '0deg'
                                    }}
                                />
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                size='medium'
                                disableElevation
                                loading={downloadLoading}
                                onClick={downloadHandler}
                            >
                                <Icon icon='ph:file-arrow-down' size='2sm' color='white' className='mr-2' />
                                Download
                            </Button>
                        </Stack>
                    )}
                </Stack>
                <Divider sx={{ my: 6, borderColor: 'neutral.light3' }} />
                <Stack
                    direction={{
                        mobile: 'column',
                        tablet: 'row'
                    }}
                    flexWrap='wrap'
                    gap={{
                        mobile: 8,
                        tablet: 15,
                        desktop: 25
                    }}
                >
                    {items.map((item) => (
                        <Box key={item.title}>
                            <Typography mb={1} component='h6' variant='labelMd' color='neutral'>
                                {item.title}
                            </Typography>
                            <Box mt={3} typography='labelMd' color='neutral.dark4'>
                                {item.content}
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
            <Menu
                anchorEl={crmMenuEl}
                open={!!crmMenuEl}
                onClose={() => setCrmMenuEl(null)}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 3,
                            padding: 3,
                            width: 300,
                            maxWidth: '100%',
                            bgcolor: 'white',
                            border: 1,
                            borderColor: 'neutral.light2',
                            borderRadius: 3,
                            boxShadow: 'none'
                        }
                    }
                }}
            >
                <IntegrationsList variant='crm' bulkId={id} />
            </Menu>
            <DeleteDialog
                show={deleteDialog}
                onShowChange={(val) => setDeleteDialog(val)}
                width={600}
                title='Delete Bulk'
                description={
                    <>
                        Are you sure that you want to delete{' '}
                        <Typography component='span' variant='bodySm' fontWeight='bold' color='neutral.dark4'>
                            {`"${name}"`}
                        </Typography>{' '}
                        ?
                    </>
                }
                loading={deleteLoading}
                onSubmitClick={async () => {
                    await deleteMutate(id);
                }}
            />
        </Box>
    );
}
